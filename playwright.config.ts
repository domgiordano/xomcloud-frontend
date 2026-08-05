import { defineConfig, devices } from '@playwright/test';

/**
 * Visual regression config.
 *
 * Exists so this app can adopt the shared Xomware design tokens safely. Its
 * radius scale collides with the shared names at different values (radius-sm
 * 8 vs 4px, radius-md 12 vs 8px, radius-pill 25 vs 100px), so adoption changes
 * every rounded corner. Without screenshots there is nothing to catch that.
 */
const PORT = 4320;

export default defineConfig({
  testDir: './tests/visual',
  workers: 1,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  reporter: [['list']],

  expect: {
    toHaveScreenshot: {
      // Absolute count, not a ratio: 1% of a tall page is ~25,000 pixels, which
      // is enough to hide a corner radius or heading size changing.
      maxDiffPixels: 150,
      animations: 'disabled',
      caret: 'hide',
    },
  },

  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'retain-on-failure',
    reducedMotion: 'reduce',
  },

  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } } },
  ],

  webServer: {
    // Builds its own input — a stale bundle from another build presents as
    // flaky screenshots rather than an obvious error.
    command: `npm run build:prod && npx serve -s dist/xomcloud -l ${PORT} --no-clipboard`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});

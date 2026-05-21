// callback.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-callback',
  template: `
    <app-loader [loading]="true" message="Authenticating with SoundCloud..."></app-loader>
  `,
  styles: []
})
export class CallbackComponent implements OnInit {
  // OAuth state values minted by XomFit (xomfit-ios) start with this prefix so
  // this shared SoundCloud callback can route them back to the iOS deep link
  // instead of completing the web auth flow. SoundCloud only allows one redirect
  // URI per app, so XomFit reuses this Xomcloud endpoint.
  private static readonly XOMFIT_STATE_PREFIX = 'xomfit-';
  private static readonly XOMFIT_CALLBACK_URL = 'xomfit://soundcloud-callback';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.tryForwardToXomFit()) {
      return;
    }
    this.authService.handleCallback();
  }

  /**
   * If this callback was kicked off by XomFit, the OAuth `state` carries our
   * prefix and we forward the entire query string (including `code` + `state`)
   * to the iOS deep link. ASWebAuthenticationSession on iOS terminates as soon
   * as the `xomfit://` redirect fires, so the iOS app receives the params and
   * the user never sees the rest of this page.
   */
  private tryForwardToXomFit(): boolean {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('state') ?? '';
    if (!state.startsWith(CallbackComponent.XOMFIT_STATE_PREFIX)) {
      return false;
    }
    const target = `${CallbackComponent.XOMFIT_CALLBACK_URL}?${window.location.search.replace(/^\?/, '')}`;
    window.location.replace(target);
    return true;
  }
}

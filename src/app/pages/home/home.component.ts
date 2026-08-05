// home.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // SVG path data, not emoji — emoji are not used in Xomware product UI.
  features = [
    {
      iconPath: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
      title: 'View Your Likes',
      description: 'Browse all your liked tracks in one beautiful interface'
    },
    {
      iconPath: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z',
      title: 'Manage Playlists',
      description: 'Create, edit, and organize your SoundCloud playlists'
    },
    {
      iconPath: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
      title: 'Discover Music',
      description: 'Search and explore tracks from millions of artists'
    },
    {
      iconPath: 'M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z',
      title: 'Profile Stats',
      description: 'View your listening stats, followers, and more'
    }
  ];

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login();
  }
}

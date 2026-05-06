import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent implements OnInit {
  isVisible = true;

  ngOnInit(): void {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
      this.isVisible = false;
    }
  }

  acceptCookies(): void {
    localStorage.setItem('cookieConsent', 'accepted');
    this.isVisible = false;
  }

  declineCookies(): void {
    localStorage.setItem('cookieConsent', 'declined');
    this.isVisible = false;
  }
}

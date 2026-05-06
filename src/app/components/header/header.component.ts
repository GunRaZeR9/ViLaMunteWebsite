import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mobileMenuOpen = false;
  currentLanguage = 'ro';

  constructor(public i18nService: I18nService) {}

  ngOnInit(): void {
    this.i18nService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  toggleLanguage(): void {
    this.i18nService.toggleLanguage();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}

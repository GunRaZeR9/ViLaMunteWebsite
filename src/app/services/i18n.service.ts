import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLanguage = new BehaviorSubject<string>('ro');
  public language$: Observable<string> = this.currentLanguage.asObservable();

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.initializeLanguages();
  }

  private initializeLanguages(): void {
    this.translate.setDefaultLang('ro');
    this.translate.use('ro').subscribe();
    const storedLang = isPlatformBrowser(this.platformId)
      ? localStorage.getItem('language') || 'ro'
      : 'ro';
    this.setLanguage(storedLang);
  }

  setLanguage(lang: string): void {
    if (lang === 'ro' || lang === 'en') {
      this.translate.use(lang).subscribe();
      this.currentLanguage.next(lang);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('language', lang);
      }
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguage.value;
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage.value === 'ro' ? 'en' : 'ro';
    this.setLanguage(newLang);
  }
}

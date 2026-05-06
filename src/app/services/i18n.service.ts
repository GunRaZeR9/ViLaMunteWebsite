import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLanguage = new BehaviorSubject<string>('ro');
  public language$: Observable<string> = this.currentLanguage.asObservable();

  constructor(private translate: TranslateService) {
    this.initializeLanguages();
  }

  private initializeLanguages(): void {
    this.translate.setDefaultLang('ro');
    this.translate.use('ro').subscribe();
    const storedLang = localStorage.getItem('language') || 'ro';
    this.setLanguage(storedLang);
  }

  setLanguage(lang: string): void {
    if (lang === 'ro' || lang === 'en') {
      this.translate.use(lang).subscribe();
      this.currentLanguage.next(lang);
      localStorage.setItem('language', lang);
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

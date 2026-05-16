import { mergeApplicationConfig, ApplicationConfig, inject } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { TranslationObject } from '@ngx-translate/core';
import { TransferState, makeStateKey } from '@angular/core';

import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { TRANSLATIONS_KEY } from './translations.tokens';
import roTranslations from '../assets/i18n/ro.json';
import enTranslations from '../assets/i18n/en.json';

const translations: Record<string, TranslationObject> = {
  ro: roTranslations as TranslationObject,
  en: enTranslations as TranslationObject,
};

class InlineTranslateLoader implements TranslateLoader {
  private transferState = inject(TransferState);

  getTranslation(lang: string): Observable<TranslationObject> {
    const result = translations[lang] ?? translations['ro'];
    this.transferState.set(TRANSLATIONS_KEY, translations);
    return of(result);
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: TranslateLoader, useClass: InlineTranslateLoader },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

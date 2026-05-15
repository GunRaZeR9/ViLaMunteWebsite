import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { TranslationObject } from '@ngx-translate/core';

import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import roTranslations from '../assets/i18n/ro.json';
import enTranslations from '../assets/i18n/en.json';

const translations: Record<string, TranslationObject> = {
  ro: roTranslations as TranslationObject,
  en: enTranslations as TranslationObject,
};

class InlineTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    return of(translations[lang] ?? translations['ro']);
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: TranslateLoader, useClass: InlineTranslateLoader },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

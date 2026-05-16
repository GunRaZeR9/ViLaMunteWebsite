import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TransferState } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TranslationObject } from '@ngx-translate/core';

import { routes } from './app.routes';
import { TRANSLATIONS_KEY } from './app.config.server';

class BrowserTranslateLoader implements TranslateLoader {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);

  getTranslation(lang: string): Observable<TranslationObject> {
    const cached = this.transferState.get(TRANSLATIONS_KEY, null);
    if (cached) {
      this.transferState.remove(TRANSLATIONS_KEY);
      return of(cached[lang] ?? cached['ro']);
    }
    return this.http.get<TranslationObject>(`./assets/i18n/${lang}.json`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: BrowserTranslateLoader,
        }
      })
    )
  ]
};

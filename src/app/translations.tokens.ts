import { makeStateKey } from '@angular/core';
import { TranslationObject } from '@ngx-translate/core';

export const TRANSLATIONS_KEY = makeStateKey<Record<string, TranslationObject>>('translations');
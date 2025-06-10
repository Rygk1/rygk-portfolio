import { inject, Injectable, signal } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  translate = inject(TranslateService);

  lang = signal(this.translate.currentLang || this.translate.getDefaultLang());

  setCurrentLang(lang: string) {
    this.lang.set(lang);
  }

  get currentLang() {
    return this.lang();
  }
}

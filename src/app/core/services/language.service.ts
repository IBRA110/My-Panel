import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { Language } from '../interfaces/language.interface';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeysEnum } from '../enums/local-storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private language = new Subject<Language>();

  public constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
  ) {}

  public setLanguage(language: Language): void {
    this.localStorageService.saveData(
      LocalStorageKeysEnum.CURRENT_LANGUAGE,
      JSON.stringify({
        id: language.id,
        name: language.name.toLowerCase(),
      }),
    );
    this.language.next({
      id: language.id,
      name: language.name,
    });
    this.translateService.setDefaultLang(language.name.toLowerCase());
    this.translateService.use(language.name.toLowerCase());
  }
}

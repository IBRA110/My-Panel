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
  private _language = new Subject<Language>();
  public readonly language = this._language.asObservable();

  public constructor(
    private _translateService: TranslateService,
    private _localStorageService: LocalStorageService,
  ) {}

  public setLanguage(language: Language): void {
    this._localStorageService.saveData(
      LocalStorageKeysEnum.CURRENT_LANGUAGE,
      JSON.stringify({
        id: language.id,
        name: language.name.toLowerCase(),
      }),
    );
    this._language.next({
      id: language.id,
      name: language.name,
    });
    this._translateService.setDefaultLang(language.name.toLowerCase());
    this._translateService.use(language.name.toLowerCase());
  }
}

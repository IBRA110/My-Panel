import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { Language } from '../interfaces/language.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _language = new Subject<Language>();
  public readonly language = this._language.asObservable();

  public constructor(
    public translateService: TranslateService,
    public localStorageService: LocalStorageService,
  ) {}

  public setLanguage(language: Language): void {
    this.localStorageService.saveData(
      'current_language',
      JSON.stringify({
        id: language.id,
        name: language.name.toLowerCase(),
      }),
    );
    this._language.next({
      id: language.id,
      name: language.name,
    });
    this.translateService.setDefaultLang(language.name.toLowerCase());
    this.translateService.use(language.name.toLowerCase());
  }
}

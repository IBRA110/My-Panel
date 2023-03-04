import { Component, OnInit } from '@angular/core';
import { ThemesEnum } from './core/enums/themes.enum';
import { LocalStorageService } from './core/services/local-storage.service';
import { ThemeService } from './core/theme/theme.service';
import { LocalStorageKeysEnum } from './core/enums/local-storage-keys.enum';
import { TranslateService } from '@ngx-translate/core';
import { UiAlertMessagesService } from './core/services/ui-alert-messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _currentTheme: string = ThemesEnum.LIGHT;

  public constructor(
    private _translate: TranslateService,
    private _themeService: ThemeService,
    private _localStorageService: LocalStorageService,
  ) {
    _translate.addLangs(['english', 'russian']);
    _translate.setDefaultLang('english');
  }

  public ngOnInit() {
    this._currentTheme = this._localStorageService.getData(
      LocalStorageKeysEnum.CURRENT_THEME,
    );
    if (this._currentTheme) {
      this._themeService.setTheme(this._currentTheme);
    } else {
      this._localStorageService.saveData(
        LocalStorageKeysEnum.CURRENT_THEME,
        ThemesEnum.LIGHT,
      );
      this._themeService.setTheme(ThemesEnum.LIGHT);
    }
  }
}

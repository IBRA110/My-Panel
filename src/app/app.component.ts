import { Component, OnInit } from '@angular/core';
import { ThemesEnum } from './core/enums/themes.enum';
import { LocalStorageService } from './core/services/local-storage.service';
import { ThemeService } from './core/theme/theme.service';
import { LocalStorageKeysEnum } from './core/enums/local-storage-keys.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private currentTheme: string = ThemesEnum.LIGHT;

  public constructor(
    private translate: TranslateService,
    private themeService: ThemeService,
    private localStorageService: LocalStorageService,
  ) {
    translate.addLangs(['english', 'russian']);
    translate.setDefaultLang('english');
  }

  public ngOnInit() {
    this.currentTheme = this.localStorageService.getData(
      LocalStorageKeysEnum.CURRENT_THEME,
    );
    if (this.currentTheme) {
      this.themeService.setTheme(this.currentTheme);
    } else {
      this.localStorageService.saveData(
        LocalStorageKeysEnum.CURRENT_THEME,
        ThemesEnum.LIGHT,
      );
      this.themeService.setTheme(ThemesEnum.LIGHT);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ThemesEnum } from './core/enums/themes.enum';
import { LocalStorageService } from './core/services/local-storage.service';
import { ThemeService } from './core/theme/theme.service';
import { LocalStorageKeysEnum } from './core/enums/local-storage-keys.enum';

@Component({
  selector: 'app-root',
  template: ` <div app-theme>
    <router-outlet></router-outlet>
    <app-ui-alert-message></app-ui-alert-message>
  </div>`,
})
export class AppComponent implements OnInit {
  private currentTheme: string = ThemesEnum.LIGHT;

  public constructor(
    private themeService: ThemeService,
    private localStorageService: LocalStorageService,
  ) {}

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

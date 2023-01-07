import { EventEmitter, Inject, Injectable } from '@angular/core';
import { ACTIVE_THEME, Theme, THEMES } from './theme.interface';
import { LocalStorageService } from '../services/local-storage.service';
import { LocalStorageKeysEnum } from '../enums/local-storage-keys.enum';

@Injectable()
export class ThemeService {
  public themeChange = new EventEmitter<Theme>();

  public constructor(
    @Inject(THEMES) public themes: Theme[],
    @Inject(ACTIVE_THEME) public theme: string,
    private localStorageService: LocalStorageService,
  ) {}

  public getActiveTheme() {
    return this.themes.find((t) => t.name === this.theme);
  }

  public setTheme(name: string): void {
    this.theme = name;
    this.themeChange.emit(this.getActiveTheme());
    this.localStorageService.saveData(LocalStorageKeysEnum.CURRENT_THEME, name);
  }
}

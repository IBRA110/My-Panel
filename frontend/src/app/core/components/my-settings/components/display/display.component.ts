import { Component } from '@angular/core';
import { ThemesEnum } from 'src/app/core/enums/themes.enum';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent {
  public constructor(private themeService: ThemeService) {}

  public setTheme(name: string): void {
    this.themeService.setTheme(name);
  }

  public get theme(): typeof ThemesEnum {
    return ThemesEnum;
  }
}

import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/theme/theme.service';

@Component({
  selector: 'app-root',
  template: ` <div app-theme>
    <router-outlet></router-outlet>
  </div>`,
})
export class AppComponent implements OnInit {
  private currentTheme: string | null = '';

  public constructor(private themeService: ThemeService) {}

  public ngOnInit(): void {
    this.currentTheme = localStorage.getItem('Theme');
    if (!!this.currentTheme) {
      this.themeService.setTheme(this.currentTheme);
    } else {
      localStorage.setItem('Theme', 'cosmic');
      this.themeService.setTheme('cosmic');
    }
  }
}

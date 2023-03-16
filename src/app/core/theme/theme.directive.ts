import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ThemeService } from './theme.service';
import { Theme } from './theme.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[app-theme]',
})
export class ThemeDirective implements OnInit {
  public constructor(
    private _elementRef: ElementRef,
    private _themeService: ThemeService,
  ) {}

  public ngOnInit() {
    const active = this._themeService.getActiveTheme();
    if (active) {
      this._updateTheme(active);
    }
    this._themeService.themeChange
      .pipe(untilDestroyed(this))
      .subscribe((theme: Theme) => this._updateTheme(theme));
  }

  private _updateTheme(theme: Theme) {
    for (const key in theme.properties) {
      this._elementRef.nativeElement.style.setProperty(
        key,
        theme.properties[key],
      );
    }
  }
}

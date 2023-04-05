import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../interfaces/theme.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[app-theme]',
})
export class ThemeDirective implements OnInit {
  public constructor(
    private elementRef: ElementRef,
    private themeService: ThemeService,
  ) {}

  public ngOnInit() {
    const active = this.themeService.getActiveTheme();
    if (active) {
      this.updateTheme(active);
    }
    this.themeService.themeChange
      .pipe(untilDestroyed(this))
      .subscribe((theme: Theme) => this.updateTheme(theme));
  }

  private updateTheme(theme: Theme) {
    for (const key in theme.properties) {
      this.elementRef.nativeElement.style.setProperty(
        key,
        theme.properties[key],
      );
    }
  }
}

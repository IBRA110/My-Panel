import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ThemeService } from './theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from './theme.interface';

@Directive({
  selector: '[app-theme]',
})
export class ThemeDirective implements OnInit, OnDestroy {
  private _unsubscribe$: Subject<boolean> = new Subject();
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
      .pipe(takeUntil(this._unsubscribe$))
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

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}

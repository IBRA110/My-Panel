import { Component, ElementRef, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { filter, fromEvent } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-drop-down-lang',
  templateUrl: './drop-down-lang.component.html',
  styleUrls: ['./drop-down-lang.component.scss'],
})
export class DropdownLangComponent implements OnInit {
  public selectedLang: string = 'EN';
  public isDropdownShown: boolean = false;

  public constructor(
    private _translate: TranslateService,
    private _el: ElementRef,
  ) {}

  public translateTo(lang: string): void {
    this._translate.use(lang);
    this.selectedLang = lang.substring(0, 2).toUpperCase();
  }

  public ngOnInit(): void {
    fromEvent(document, 'click')
      .pipe(
        untilDestroyed(this),
        filter((event) => {
          return (
            !this._el.nativeElement ||
            !this._el.nativeElement.contains(event.target as HTMLElement)
          );
        }),
      )
      .subscribe(() => {
        this.isDropdownShown = false;
      });
  }

  public toggleDropdown(): void {
    this.isDropdownShown = !this.isDropdownShown;
  }
}

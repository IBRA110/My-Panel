/* eslint-disable no-console */
import { Component, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, fromEvent, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-drop-down-lang',
  templateUrl: './drop-down-lang.component.html',
  styleUrls: ['./drop-down-lang.component.scss'],
})
export class DropdownLangComponent {
  public selectedLang: string = 'EN';
  public isDropdownShown: boolean = false;
  private _dropdownSubscription: Subscription | null = null;

  public constructor(
    private _translate: TranslateService,
    private _el: ElementRef,
  ) {}

  public translateTo(lang: string): void {
    this._translate.use(lang);
    this.selectedLang = lang.substring(0, 2).toUpperCase();
  }

  public toggleDropdown(): void {
    if (!this._dropdownSubscription) {
      this._dropdownSubscription = fromEvent(document, 'click')
        .pipe(
          filter((event) => {
            return (
              !this._el.nativeElement ||
              !this._el.nativeElement.contains(event.target as HTMLElement)
            );
          }),
          take(1),
        )
        .subscribe(() => {
          this.isDropdownShown = false;
          this._dropdownSubscription = null;
        });
    }

    this.isDropdownShown = !this.isDropdownShown;
  }
}

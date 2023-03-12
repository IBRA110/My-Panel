import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-drop-down-lang',
  templateUrl: './drop-down-lang.component.html',
  styleUrls: ['./drop-down-lang.component.scss'],
})
export class DropdownLangComponent {
  public constructor(private _translate: TranslateService) {}

  public translateTo(lang: string): void {
    this._translate.use(lang);
  }
}

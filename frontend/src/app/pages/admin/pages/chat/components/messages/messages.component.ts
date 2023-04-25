import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UiButtonStyleEnum } from 'src/app/core/enums/ui-button-style.enum';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  public message$: FormControl = new FormControl();

  public function(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      if (e.ctrlKey) {
        this.message$.setValue(this.message$.value + '\n');
      } else {
        e.preventDefault();
      }
    }
  }

  public get buttonStyle(): typeof UiButtonStyleEnum {
    return UiButtonStyleEnum;
  }
}

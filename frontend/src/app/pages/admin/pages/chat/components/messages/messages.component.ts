import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  public message$: FormControl = new FormControl('');
  @Output() public onSend: EventEmitter<string> = new EventEmitter<string>();

  public checkClickedButton(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      if (e.ctrlKey) {
        this.message$.setValue(this.message$.value + '\n');
      } else {
        e.preventDefault();
        this.send();
      }
    }
  }

  public send(): void {
    if (!!this.message$.value) {
      this.onSend.emit(this.message$.value);
      this.message$.setValue('');
    }
  }
}

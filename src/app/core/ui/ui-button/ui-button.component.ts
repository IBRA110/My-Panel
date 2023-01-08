import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UiButtonStyleEnum } from '../../enums/ui-button-style.enum';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss'],
})
export class UiButtonComponent {
  @Input() public text: string;
  @Input() public type: string;
  @Input() public icon: string;
  @Input() public isDisabled: boolean = false;
  @Input() public scssClass: string = UiButtonStyleEnum.DEFAULT;
  @Output() public onClick = new EventEmitter();
}

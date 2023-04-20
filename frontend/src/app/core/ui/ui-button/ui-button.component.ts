import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class UiButtonComponent {
  @Input() public text: string;
  @Input() public type: string = 'button';
  @Input() public icon: string;
  @Input() public isDisabled: boolean = false;
  @Input() public scssClass: string;
  @Output() public onClick: EventEmitter<string> = new EventEmitter<string>();
}

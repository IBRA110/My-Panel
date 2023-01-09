import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss'],
})
export class UiInputComponent {
  @Input() public type: string = 'checkbox';
  @Input() public name: string;
  @Input() public class: string;
  @Input() public label: string;
  @Input() public isChecked: boolean;
}

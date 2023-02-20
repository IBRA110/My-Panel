import { Component } from '@angular/core';
import { UiButtonStyleEnum } from '../core/enums/ui-button-style.enum';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  public isSignIn: boolean = true;

  public get scssClass(): typeof UiButtonStyleEnum {
    return UiButtonStyleEnum;
  }
}

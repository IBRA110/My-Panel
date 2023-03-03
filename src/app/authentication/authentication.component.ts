import { Component } from '@angular/core';
import { UiButtonStyleEnum } from '../core/enums/ui-button-style.enum';
import { Store } from '@ngrx/store';
import { toKnowIsSignIn } from './data-access/store/authentication.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  public isToggleForm: Observable<boolean> = this.store.select(toKnowIsSignIn);

  public constructor(private store: Store) {}
  public get scssClass(): typeof UiButtonStyleEnum {
    return UiButtonStyleEnum;
  }
}

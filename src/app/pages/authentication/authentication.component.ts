import { Component } from '@angular/core';
import { UiButtonStyleEnum } from '../../core/enums/ui-button-style.enum';
import { Store } from '@ngrx/store';
import { toKnowIsSignIn } from './data-access/store/authentication.selectors';
import { Observable } from 'rxjs';
import { fadeAnimation } from '../../core/animations/fade.animation';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  animations: [fadeAnimation],
})
export class AuthenticationComponent {
  public isToggleForm: Observable<boolean> = this._store.select(toKnowIsSignIn);

  public constructor(private _store: Store) {}
  public get scssClass(): typeof UiButtonStyleEnum {
    return UiButtonStyleEnum;
  }
}

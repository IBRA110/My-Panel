import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInForm } from '../../data-access/interfaces/form.interface';
import { UiButtonStyleEnum } from './../../../core/enums/ui-button-style.enum';
import { UiAlertMessagesService } from 'src/app/core/services/ui-alert-messages.service';
import { Store } from '@ngrx/store';
import {
  signIn,
  toggleForms,
} from '../../data-access/store/authentication.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup<SignInForm>;
  public typeOfInput: 'password' | 'text' = 'password';
  public constructor(
    private alertMessage: UiAlertMessagesService,
    public store: Store,
  ) {}

  public ngOnInit(): void {
    this.signInForm = new FormGroup<SignInForm>({
      userName: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });
  }

  public onSignIn(): void {
    if (this.signInForm.invalid) {
      this.alertMessage.callWarningMessage('All Fields Are Required!!!');
      return;
    }
    this.store.dispatch(
      signIn({
        userName: this.signInForm.value.userName,
        password: this.signInForm.value.password,
      }),
    );
  }

  public get scssClass(): typeof UiButtonStyleEnum {
    return UiButtonStyleEnum;
  }

  public toggleType(): void {
    if (this.typeOfInput === 'password') {
      this.typeOfInput = 'text';
      return;
    }
    this.typeOfInput = 'password';
    return;
  }

  public toggleForm(): void {
    this.store.dispatch(toggleForms({ payload: false }));
  }
}

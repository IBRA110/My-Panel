import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UiButtonStyleEnum } from 'src/app/core/enums/ui-button-style.enum';
import { SignUpForm } from '../../data-access/interfaces/form.interface';
import {
  signUp,
  toggleForms,
} from '../../data-access/store/authentication.actions';
import { UiAlertMessagesService } from 'src/app/core/services/ui-alert-messages.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public typeOfInput: string[] = ['password', 'password'];
  public signUpForm: FormGroup<SignUpForm>;

  public constructor(
    private store: Store,
    private alertMessageService: UiAlertMessagesService,
  ) {}

  public ngOnInit(): void {
    this.signUpForm = new FormGroup<SignUpForm>({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      passwords: new FormGroup({
        password: new FormControl('', Validators.required),
        confirmpassword: new FormControl('', Validators.required),
      }),
    });
  }

  //TODO: https://codinglatte.com/posts/angular/cool-password-validation-angular/ password validation

  public onSignUp(): void {
    if (this.signUpForm.invalid) {
      this.alertMessageService.callWarningMessage('All Fields Are Required!!!');
      return;
    }
    this.store.dispatch(
      signUp({
        userName: this.signUpForm.get('userName').value,
        email: this.signUpForm.get('email').value,
        password: this.signUpForm.get('passwords.password').value,
      }),
    );
  }

  public get scssClass(): typeof UiButtonStyleEnum {
    return UiButtonStyleEnum;
  }

  public toggleType(i: number): void {
    if (this.typeOfInput[i] === 'password') {
      this.typeOfInput[i] = 'text';
      return;
    }
    this.typeOfInput[i] = 'password';
    return;
  }

  public toggleForm(): void {
    this.store.dispatch(toggleForms({ payload: true }));
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UiButtonStyleEnum } from 'src/app/core/enums/ui-button-style.enum';
import { SignUpForm } from '../../data-access/interfaces/form.interface';
import {
  signUp,
  toggleForms,
} from '../../data-access/store/authentication.actions';
import { UiAlertMessagesService } from 'src/app/core/services/ui-alert-messages.service';
import { CustomValidators } from 'src/app/core/validators/custom.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public typeOfInput: string[] = ['password', 'password'];
  public signUpForm: FormGroup<SignUpForm>;

  public constructor(
    private _fb: FormBuilder,
    private _store: Store,
    private _alertMessageService: UiAlertMessagesService,
  ) {}

  public ngOnInit(): void {
    this.signUpForm = this._fb.group(
      {
        userName: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true,
            }),
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true,
            }),
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true,
              },
            ),
            Validators.minLength(8),
          ],
        ],
        confirmpassword: ['', [Validators.required]],
      },
      {
        validator: CustomValidators.сonfirmPasswordValidator(
          'password',
          'confirmpassword',
        ),
      },
    );
  }

  public onSignUp(): void {
    if (this.signUpForm.invalid) {
      this._alertMessageService.callWarningMessage(
        'All Fields Are Required!!!',
      );
      return;
    }
    this._store.dispatch(
      signUp({
        userName: this.signUpForm.get('userName').value,
        email: this.signUpForm.get('email').value,
        password: this.signUpForm.get('password').value,
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
    this._store.dispatch(toggleForms({ payload: true }));
  }

  public controlHasError(control: string, error: string): boolean {
    return (
      this.signUpForm.get(control).hasError(error) &&
      this.signUpForm.get(control).touched
    );
  }
}

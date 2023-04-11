import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInForm } from '../../data/interfaces/sign-form.interface';
import { UiButtonStyleEnum } from './../../../../core/enums/ui-button-style.enum';
import { UiAlertMessagesService } from 'src/app/core/services/ui-alert-messages.service';
import { Store } from '@ngrx/store';
import { signIn, toggleForms } from '../../data/store/authentication.actions';
import { TranslateService } from '@ngx-translate/core';

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
    private store: Store,
    private translateService: TranslateService,
  ) {}

  public ngOnInit(): void {
    this.signInForm = new FormGroup<SignInForm>({
      userName: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });
  }

  public onSignIn(): void {
    if (this.signInForm.invalid) {
      this.alertMessage.callWarningMessage(
        this.translateService.instant('AUTHENTICATION.ALL_FIELDS_ARE_REQUIRED'),
      );
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
    this.store.dispatch(toggleForms());
  }
}

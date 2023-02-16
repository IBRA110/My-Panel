import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UiButtonStyleEnum } from 'src/app/core/enums/ui-button-style.enum';
import { SignUpForm } from '../../data-access/interfaces/form.interface';
import { signUp } from '../../data-access/store/authentication.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @Output() public onClick = new EventEmitter();
  public signUpForm: FormGroup<SignUpForm>;

  public constructor(private store: Store) {}

  public ngOnInit(): void {
    this.signUpForm = new FormGroup<SignUpForm>({
      userName: new FormControl('', Validators.required),
      passwords: new FormGroup(
        {
          password: new FormControl('', Validators.required),
          confirmpassword: new FormControl('', Validators.required),
        },
        this.passwordCheck,
      ),
      email: new FormControl(''),
    });
  }

  public onSignUp(): void {
    this.store.dispatch(
      signUp({
        userName: this.signUpForm.get('userName').value,
        email: this.signUpForm.get('email').value,
        password: this.signUpForm.get('passwords.password').value,
      }),
    );
  }

  private passwordCheck(control: FormGroup): { [s: string]: boolean } {
    if (control.get('password').value != control.get('confirmpassword').value) {
      return { notsame: true };
    }
    return { notsame: false };
  }

  public get scssClass(): typeof UiButtonStyleEnum {
    return UiButtonStyleEnum;
  }
}

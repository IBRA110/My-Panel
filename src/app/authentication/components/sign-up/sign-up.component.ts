import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpForm } from '../../data-assets/interfaces/form.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup<SignUpForm>;
  @Output() public onClick = new EventEmitter();
  public constructor() {}

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
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      gender: new FormControl(''),
      dateOfBirth: new FormControl(),
      city: new FormControl(''),
      country: new FormControl(''),
    });
  }

  public onSignUp(): void {
    console.log(this.signUpForm.value);
  }

  private passwordCheck(control: FormGroup): { [s: string]: boolean } {
    if (control.get('password').value != control.get('confirmpassword').value) {
      return { notsame: true };
    }
    return null;
  }
}

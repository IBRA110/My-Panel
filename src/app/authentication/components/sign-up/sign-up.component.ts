import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpForm } from '../../data-assets/interfaces/form.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup<SignUpForm>;
  public constructor() {}

  public ngOnInit(): void {
    this.signUpForm = new FormGroup<SignUpForm>({
      userName: new FormControl('', Validators.required),
      passwords: new FormGroup({
        password: new FormControl('', Validators.required),
        confirmpassword: new FormControl('', Validators.required),
      }),
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      gender: new FormControl(''),
      dateOfBirth: new FormControl(),
      city: new FormControl(''),
      country: new FormControl(''),
    });
  }

  public onSignUp(): void {}
}

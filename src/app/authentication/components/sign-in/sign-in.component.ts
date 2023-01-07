import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface SignInForm {
  userName: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup<SignInForm> = new FormGroup<SignInForm>({
    userName: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });
  public constructor(private http: HttpClient) {}

  public ngOnInit() {
    this.signInForm = new FormGroup<SignInForm>({
      userName: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });
  }

  public onSignup() {}
}

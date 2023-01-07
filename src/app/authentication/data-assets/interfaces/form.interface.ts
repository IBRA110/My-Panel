import { FormControl, FormGroup } from '@angular/forms';

export interface SignInForm {
  userName: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface SignUpForm {
  userName: FormControl<string | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  passwords: FormGroup<Passwords | null>;
  gender: FormControl<string | null>;
  dateOfBirth: FormControl<Date | null>;
  city: FormControl<string | null>;
  country: FormControl<string | null>;
}

export interface Passwords {
  password: FormControl<string | null>;
  confirmpassword: FormControl<string | null>;
}

import { FormControl } from '@angular/forms';

export interface SignInForm {
  userName: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface SignUpForm {
  userName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmpassword: FormControl<string | null>;
}

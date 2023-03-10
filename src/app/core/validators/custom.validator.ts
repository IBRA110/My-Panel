import {
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
  FormGroup,
} from '@angular/forms';

export class CustomValidators {
  public static patternValidator(
    regex: RegExp,
    error: ValidationErrors,
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  // public static passwordMatchValidator(
  //   control: AbstractControl,
  // ): ValidationErrors | null {
  //   const password: string = control.get('password').value;
  //   const confirmPassword: string = control.get('confirmPassword').value;

  //   if (password !== confirmPassword) {
  //     // control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
  //     return { NoPasswordMatch: true };
  //   }

  //   return null;
  // }

  public static ConfirmPasswordValidator(
    controlName: string,
    matchingControlName: string,
  ) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmPasswordValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}

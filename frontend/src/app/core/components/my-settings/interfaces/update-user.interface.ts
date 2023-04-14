import { FormControl } from '@angular/forms';

export interface UpdateUserForm {
  city: FormControl<string | null>;
  country: FormControl<string | null>;
  dateOfBirth: FormControl<Date | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  interests: FormControl<string | null>;
  introduction: FormControl<string | null>;
}

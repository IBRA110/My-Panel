import { FormControl } from '@angular/forms';

export interface EventForm {
  title: FormControl<string | null>;
  content: FormControl<string | null>;
  isPrivate: FormControl<boolean | null>;
  startDate: FormControl<Date | null>;
  endDate: FormControl<Date | null>;
  color: FormControl<string | null>;
}

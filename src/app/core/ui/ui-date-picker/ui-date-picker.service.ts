import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UiDatePickerService {
  public Date$: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  public changeMonth(dir: number): void {
    const value = this.Date$.value.add(dir, 'month');
    this.Date$.next(value);
  }

  public changeDate(date: moment.Moment): void {
    const value = this.Date$.value.set({
      date: date.date(),
      month: date.month(),
    });
    this.Date$.next(value);
  }
}

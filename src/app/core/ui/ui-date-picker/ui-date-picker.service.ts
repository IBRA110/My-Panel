import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UiDatePickerService {
  public startDate: BehaviorSubject<moment.Moment> = new BehaviorSubject(
    moment(),
  );
  public endDate: BehaviorSubject<moment.Moment> = new BehaviorSubject(
    moment(),
  );

  public changeMonth(dir: number, isStart) {
    if (isStart) {
      const value = this.startDate.value.add(dir, 'month');
      this.startDate.next(value);
    } else {
      const value = this.endDate.value.add(dir, 'month');
      this.endDate.next(value);
    }
  }

  public changeDate(date: moment.Moment, isStart: boolean) {
    if (isStart) {
      const value = this.startDate.value.set({
        date: date.date(),
        month: date.month(),
      });
      this.startDate.next(value);
    } else {
      const value = this.endDate.value.set({
        date: date.date(),
        month: date.month(),
      });
      this.endDate.next(value);
    }
  }
}
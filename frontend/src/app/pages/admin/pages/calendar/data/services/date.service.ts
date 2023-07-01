import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());
  public now: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  public changeMonthWeekDay(dir: number, event): void {
    const value = this.date.value.add(dir, event);
    this.date.next(value);
  }

  public goToNow(): void {
    this.date.next(moment());
  }

  public changeDate(date: moment.Moment): void {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month(),
    });
    this.date.next(value);
  }
}

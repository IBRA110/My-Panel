import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';
import { MomentPipe } from 'src/app/core/pipes/moment.pipe';
import { Week } from 'src/app/core/interfaces/date.interface';

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.scss'],
  standalone: true,
  imports: [CommonModule, MomentPipe, TranslateModule],
})
export class WeeklyCalendarComponent implements OnChanges {
  public calendar: Week[];
  public daysOfTheWeek: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  public hours: string[] = this.createHours();

  public constructor() {}

  @Input() public date: moment.Moment = moment();

  @Output() public selectDate: EventEmitter<moment.Moment> =
    new EventEmitter<moment.Moment>();

  @Output() public openPopup: EventEmitter<moment.Moment> =
    new EventEmitter<moment.Moment>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['date'].currentValue) {
      this.generate(this.date);
    }
  }

  private generate(now: moment.Moment): void {
    const startDay: moment.Moment = moment(now).clone().startOf('week');
    const endDay: moment.Moment = moment(now).clone().endOf('week');

    const date: moment.Moment = startDay.clone().subtract(1, 'day');
    const calendar: Week[] = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !moment(now).isSame(value, 'month');
            const selected = moment(now).isSame(value, 'date');

            return {
              value,
              active,
              disabled,
              selected,
            };
          }),
      });
    }
    this.calendar = calendar;
  }

  public selected(day: moment.Moment): void {
    this.selectDate.emit(day);
  }

  private createHours(): string[] {
    const hours: string[] = ['12 AM', ''];
    let hour: number = 1;
    let times: string = 'AM';
    while (hours.length < 48) {
      hours.push(hour.toString() + ' ' + times);
      hours.push('');
      hour++;
      if (hour > 11 && times !== 'PM') {
        times = 'PM';
        hours.push('12' + ' ' + times);
        hours.push('');
        hour = 1;
      }
    }
    return hours;
  }
}

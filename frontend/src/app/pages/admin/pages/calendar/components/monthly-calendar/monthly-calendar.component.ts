import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Week } from 'src/app/core/interfaces/date.interface';
import * as moment from 'moment';
import { MomentPipe } from 'src/app/core/pipes/moment.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.scss'],
  standalone: true,
  imports: [CommonModule, MomentPipe, TranslateModule],
})
export class MonthlyCalendarComponent implements OnChanges {
  public calendar: Week[];
  public week: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  @Input() public date: moment.Moment = moment();

  @Output() public selectDate: EventEmitter<moment.Moment> =
    new EventEmitter<moment.Moment>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['date'].currentValue) {
      this.generate(this.date);
    }
  }

  private generate(now: moment.Moment): void {
    const startDay: moment.Moment = moment(now)
      .clone()
      .startOf('month')
      .startOf('week');
    const endDay: moment.Moment = moment(now)
      .clone()
      .endOf('month')
      .endOf('week');

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
}

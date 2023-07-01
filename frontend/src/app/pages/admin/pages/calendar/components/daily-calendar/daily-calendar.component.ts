import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import moment from 'moment';
import { DateService } from '../../data/services/date.service';
import { Week } from 'src/app/core/interfaces/date.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MomentPipe } from 'src/app/core/pipes/moment.pipe';

@UntilDestroy()
@Component({
  selector: 'app-daily-calendar',
  templateUrl: './daily-calendar.component.html',
  styleUrls: ['./daily-calendar.component.scss'],
  standalone: true,
  imports: [CommonModule, MomentPipe, TranslateModule],
})
export class DailyCalendarComponent {
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

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.dateService.date
      .pipe(untilDestroyed(this))
      .subscribe(this.generate.bind(this));
  }

  private generate(now: moment.Moment) {
    const startDay = now.clone().startOf('day');
    const endDay = now.clone().endOf('day');

    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(1)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');

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

  public selected(day: moment.Moment) {
    this.dateService.changeDate(day);
  }

  private createHours(): string[] {
    let hours: string[] = ['12 AM', ''];
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

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';
import { MomentPipe } from 'src/app/core/pipes/moment.pipe';
import { DateService } from '../../data/services/date.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Week } from 'src/app/core/interfaces/date.interface';

@UntilDestroy()
@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.scss'],
  standalone: true,
  imports: [CommonModule, MomentPipe, TranslateModule],
})
export class WeeklyCalendarComponent implements OnInit {
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

  public constructor(private dateService: DateService) {}

  public ngOnInit(): void {
    this.dateService.date
      .pipe(untilDestroyed(this))
      .subscribe(this.generate.bind(this));
  }

  private generate(now: moment.Moment) {
    const startDay = now.clone().startOf('week');
    const endDay = now.clone().endOf('week');

    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
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

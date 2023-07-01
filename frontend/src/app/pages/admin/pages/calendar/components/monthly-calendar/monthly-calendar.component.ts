import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Week } from 'src/app/core/interfaces/date.interface';
import * as moment from 'moment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DateService } from '../../data/services/date.service';
import { MomentPipe } from 'src/app/core/pipes/moment.pipe';
import { TranslateModule } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.scss'],
  standalone: true,
  imports: [CommonModule, MomentPipe, TranslateModule],
})
export class MonthlyCalendarComponent implements OnInit {
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

  public constructor(private dateService: DateService) {}

  public ngOnInit(): void {
    this.dateService.date
      .pipe(untilDestroyed(this))
      .subscribe(this.generate.bind(this));
  }

  private generate(now: moment.Moment): void {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

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

  public selected(day: moment.Moment): void {
    this.dateService.changeDate(day);
  }
}

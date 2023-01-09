import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UiDatePickerService } from './ui-date-picker.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { Week } from '../../interfaces/date.interface';

@UntilDestroy()
@Component({
  selector: 'app-ui-date-picker',
  templateUrl: './ui-date-picker.component.html',
  styleUrls: ['./ui-date-picker.component.scss'],
})
export class UiDatePickerComponent implements OnInit {
  public calendar: Week[];
  public date: moment.Moment;
  @Input() public isStart: boolean;
  public endDate: BehaviorSubject<moment.Moment>;
  public isOpen: boolean = false;

  public constructor(public dateService: UiDatePickerService) {}

  public ngOnInit() {
    this.dateService.Date$.pipe(untilDestroyed(this)).subscribe(
      this.generate.bind(this),
    );
  }

  private generate(now: moment.Moment) {
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

  public select(day: moment.Moment): void {
    this.dateService.changeDate(day);
    this.openCalendar();
  }

  public openCalendar(): void {
    this.isOpen = !this.isOpen;
  }

  public next(): void {
    this.dateService.changeMonth(-1);
  }
  public prev(): void {
    this.dateService.changeMonth(1);
  }
}

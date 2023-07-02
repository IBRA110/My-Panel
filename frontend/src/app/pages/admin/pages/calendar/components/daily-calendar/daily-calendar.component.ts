import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { Day } from 'src/app/core/interfaces/date.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MomentPipe } from 'src/app/core/pipes/moment.pipe';

@Component({
  selector: 'app-daily-calendar',
  templateUrl: './daily-calendar.component.html',
  styleUrls: ['./daily-calendar.component.scss'],
  standalone: true,
  imports: [CommonModule, MomentPipe, TranslateModule],
})
export class DailyCalendarComponent implements OnChanges {
  public calendar: Day;

  public hours: string[] = this.createHours();
  @Input() public date: moment.Moment = moment();
  public constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['date'].currentValue) {
      this.generate(this.date);
    }
  }

  private generate(now: moment.Moment): void {
    this.calendar = {
      value: now,
      active: moment().isSame(now, 'date'),
      disabled: !now.isSame(now, 'month'),
      selected: now.isSame(now, 'date'),
    };
  }

  public selected(day: moment.Moment): void {}

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

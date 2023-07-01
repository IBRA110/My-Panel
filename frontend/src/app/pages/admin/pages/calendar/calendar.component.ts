import { Component } from '@angular/core';
import { UiSelectTabsStyleEnum } from 'src/app/core/enums/ui-select-tabs-style.enum';
import { DateService } from './data/services/date.service';
import { fadeAnimationMySettings } from 'src/app/core/animations/fade.animation';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [fadeAnimationMySettings],
})
export class CalendarComponent {
  public selectedTab: string = 'Monthly';
  private dateDict: Record<string, string> = {
    Monthly: 'month',
    Weekly: 'week',
    Daily: 'day',
  };

  public constructor(public dateService: DateService) {}

  public changeCalendar(tab: string): void {
    this.selectedTab = tab;
  }

  public changeDate(tab: string): void {
    const unitOfTime: string = this.dateDict[this.selectedTab].toLowerCase();
    if (tab === 'prev') {
      this.dateService.changeMonthWeekDay(-1, unitOfTime);
      return;
    } else if (tab === 'next') {
      this.dateService.changeMonthWeekDay(1, unitOfTime);
      return;
    }
    this.dateService.goToNow();
  }

  public get scssClass(): typeof UiSelectTabsStyleEnum {
    return UiSelectTabsStyleEnum;
  }
}

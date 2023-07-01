import { Component } from '@angular/core';
import { UiSelectTabsStyleEnum } from 'src/app/core/enums/ui-select-tabs-style.enum';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  public selectedTab: string = 'Monthly';

  public changeCalendar(tab: string): void {
    this.selectedTab = tab;
  }

  public changeDate(tab: string): void {}

  public get scssClass(): typeof UiSelectTabsStyleEnum {
    return UiSelectTabsStyleEnum;
  }
}

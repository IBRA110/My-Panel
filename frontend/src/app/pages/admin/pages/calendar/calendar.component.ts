import { Component } from '@angular/core';
import { UiSelectTabsStyleEnum } from 'src/app/core/enums/ui-select-tabs-style.enum';
import { fadeAnimationMySettings } from 'src/app/core/animations/fade.animation';
import { Store } from '@ngrx/store';
import {
  changeCalendar,
  changeDate,
  changeDateToToday,
  selectDay,
} from './data/store/calendar.actions';
import {
  selectCurrentCalendar,
  selectDate,
} from './data/store/calendar.selectors';
import { Observable } from 'rxjs';
import { CalendarType } from './data/types/calendar.type';
import { PopupService } from 'src/app/core/services/popup.service';
import { CalendarEventFormComponent } from 'src/app/core/components/calendar-event-form/calendar-event-form.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [fadeAnimationMySettings],
})
export class CalendarComponent {
  public selectedTab: Observable<CalendarType> = this.store.select(
    selectCurrentCalendar,
  );
  private dateDict: Record<string, string> = {
    Monthly: 'month',
    Weekly: 'week',
    Daily: 'day',
  };
  public date: Observable<moment.Moment> = this.store.select(selectDate);

  public constructor(
    private store: Store,
    private popupService: PopupService,
  ) {}

  public changeCalendar(tab: string): void {
    this.store.dispatch(changeCalendar({ calendar: tab as CalendarType }));
  }

  public changeDate(tab: string, selectedTab: string): void {
    const unitOfTime: string = this.dateDict[selectedTab].toLowerCase();
    if (tab === 'prev') {
      this.store.dispatch(changeDate({ dir: -1, event: unitOfTime }));
      return;
    } else if (tab === 'next') {
      this.store.dispatch(changeDate({ dir: 1, event: unitOfTime }));
      return;
    }
    this.store.dispatch(changeDateToToday());
  }

  public selectDay(day: moment.Moment): void {
    this.store.dispatch(selectDay({ day: day }));
  }

  public get scssClass(): typeof UiSelectTabsStyleEnum {
    return UiSelectTabsStyleEnum;
  }

  public openPopup(event: moment.Moment): void {
    this.popupService.open(
      'calendar-event-form',
      CalendarEventFormComponent,
      event,
    );
  }
}

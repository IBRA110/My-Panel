import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { UiSelectTabsComponent } from 'src/app/core/ui/ui-select-tabs/ui-select-tabs.component';
import { MonthlyCalendarComponent } from './components/monthly-calendar/monthly-calendar.component';
import { TranslateModule } from '@ngx-translate/core';
import { MomentPipe } from 'src/app/core/pipes/moment.pipe';
import { WeeklyCalendarComponent } from './components/weekly-calendar/weekly-calendar.component';
import { DailyCalendarComponent } from './components/daily-calendar/daily-calendar.component';
import { StoreModule } from '@ngrx/store';
import { calendarFeatureKey, reducer } from './data/store/calendar.reduser';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    UiSelectTabsComponent,
    MonthlyCalendarComponent,
    WeeklyCalendarComponent,
    DailyCalendarComponent,
    MomentPipe,
    TranslateModule,
    StoreModule.forFeature(calendarFeatureKey, reducer),
    RouterModule.forChild([{ path: '', component: CalendarComponent }]),
  ],
  exports: [],
  providers: [],
})
export class CalendarModule {}

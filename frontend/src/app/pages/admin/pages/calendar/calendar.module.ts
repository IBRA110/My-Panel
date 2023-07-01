import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { UiSelectTabsComponent } from 'src/app/core/ui/ui-select-tabs/ui-select-tabs.component';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    UiSelectTabsComponent,
    RouterModule.forChild([{ path: '', component: CalendarComponent }]),
  ],
  exports: [],
  providers: [],
})
export class CalendarModule {}

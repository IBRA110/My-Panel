import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CalendarComponent }]),
  ],
  exports: [],
  providers: [],
})
export class CalendarModule {}

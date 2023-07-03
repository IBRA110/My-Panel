import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySettingsModule } from '../components/my-settings/my-settings.module';
import { CalendarEventFormModule } from '../components/calendar-event-form/calendar-event-form.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MySettingsModule, CalendarEventFormModule],
  exports: [],
})
export class CoreModule {}

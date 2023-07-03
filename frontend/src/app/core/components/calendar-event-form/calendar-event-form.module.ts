import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component';
import { UiPopupModule } from '../../ui/ui-popup/ui-popup.module';
import { UiSelectTabsComponent } from '../../ui/ui-select-tabs/ui-select-tabs.component';
import { CalendarEventFormComponent } from './calendar-event-form.component';

@NgModule({
  declarations: [CalendarEventFormComponent],
  imports: [
    CommonModule,
    TranslateModule,
    UiPopupModule,
    UiSelectTabsComponent,
    ReactiveFormsModule,
    UiButtonComponent,
  ],
  exports: [CalendarEventFormComponent],
})
export class CalendarEventFormModule {}

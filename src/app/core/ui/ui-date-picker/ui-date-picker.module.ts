import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiDatePickerComponent } from './ui-date-picker.component';
import { UiButtonModule } from '../ui-button/ui-button.module';
import { UiDatePickerService } from './ui-date-picker.service';
import { PipeModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [UiDatePickerComponent],
  imports: [CommonModule, UiButtonModule, PipeModule],
  exports: [UiDatePickerComponent],
  providers: [UiDatePickerService],
})
export class UiDatePickerModule {}

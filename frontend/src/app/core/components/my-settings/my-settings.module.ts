import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySettingsComponent } from './my-settings.component';
import { UiPopupModule } from '../../ui/ui-popup/ui-popup.module';

@NgModule({
  declarations: [MySettingsComponent],
  imports: [CommonModule, UiPopupModule],
  exports: [MySettingsComponent],
})
export class MySettingsModule {}

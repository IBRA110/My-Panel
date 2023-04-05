import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySettingsComponent } from './my-settings.component';
import { UiPopupModule } from '../../ui/ui-popup/ui-popup.module';
import { TranslateModule } from '@ngx-translate/core';
import { UiSelectTabComponentModule } from '../../ui/ui-select-tabs/ui-select-tabs.module';

@NgModule({
  declarations: [MySettingsComponent],
  imports: [
    CommonModule,
    UiPopupModule,
    TranslateModule,
    UiSelectTabComponentModule,
  ],
  exports: [MySettingsComponent],
})
export class MySettingsModule {}

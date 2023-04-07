import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySettingsComponent } from './my-settings.component';
import { UiPopupModule } from '../../ui/ui-popup/ui-popup.module';
import { TranslateModule } from '@ngx-translate/core';
import { UiSelectTabComponentModule } from '../../ui/ui-select-tabs/ui-select-tabs.module';
import { ProfileComponent } from './components/profile/profile.component';
import { DisplayComponent } from './components/display/display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiButtonModule } from '../../ui/ui-button/ui-button.module';

@NgModule({
  declarations: [MySettingsComponent, ProfileComponent, DisplayComponent],
  imports: [
    CommonModule,
    UiPopupModule,
    TranslateModule,
    UiSelectTabComponentModule,
    ReactiveFormsModule,
    UiButtonModule,
  ],
  exports: [MySettingsComponent],
})
export class MySettingsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySettingsComponent } from './my-settings.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileComponent } from './components/profile/profile.component';
import { DisplayComponent } from './components/display/display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component';
import { UiPopupModule } from '../../ui/ui-popup/ui-popup.module';
import { UiSelectTabsComponent } from '../../ui/ui-select-tabs/ui-select-tabs.component';

@NgModule({
  declarations: [MySettingsComponent, ProfileComponent, DisplayComponent],
  imports: [
    CommonModule,
    TranslateModule,
    UiPopupModule,
    UiSelectTabsComponent,
    ReactiveFormsModule,
    UiButtonComponent,
  ],
  exports: [MySettingsComponent],
})
export class MySettingsModule {}

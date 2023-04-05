import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSelectTabsComponent } from './ui-select-tabs.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UiSelectTabsComponent],
  imports: [CommonModule, TranslateModule],
  exports: [UiSelectTabsComponent],
})
export class UiSelectTabComponentModule {}

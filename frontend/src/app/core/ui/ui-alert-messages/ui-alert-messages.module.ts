import { NgModule } from '@angular/core';
import { UiAlertMessagesComponent } from './ui-alert-messages/ui-alert-messages.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UiAlertMessagesComponent],
  imports: [CommonModule],
  exports: [UiAlertMessagesComponent],
})
export class UiAlertMessagesModule {}

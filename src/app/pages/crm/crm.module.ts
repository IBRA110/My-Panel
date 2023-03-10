import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CrmRoutingModule } from './crm-routing.module';
import { CrmComponent } from './crm.component';

@NgModule({
  declarations: [CrmComponent],
  imports: [CrmRoutingModule],
})
export class CrmModule {}

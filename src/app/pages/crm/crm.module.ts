import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CrmRoutingModule } from './crm-routing.module';
import { CrmComponent } from './crm.component';

@NgModule({
  declarations: [CrmComponent, SideBarComponent],
  imports: [CommonModule, CrmRoutingModule],
})
export class CrmModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CrmRoutingModule } from './crm-routing.module';
import { CrmComponent } from './crm.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';

@NgModule({
  declarations: [CrmComponent, SideBarComponent, NavBarComponent],
  imports: [CommonModule, CrmRoutingModule, DashboardModule],
})
export class CrmModule {}

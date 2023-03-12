import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownLangComponent } from './components/nav-bar/components/drop-down-lang/drop-down-lang.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CrmRoutingModule } from './crm-routing.module';
import { CrmComponent } from './crm.component';

@NgModule({
  declarations: [
    CrmComponent,
    SideBarComponent,
    NavBarComponent,
    DropdownLangComponent,
  ],
  imports: [CommonModule, CrmRoutingModule],
})
export class CrmModule {}

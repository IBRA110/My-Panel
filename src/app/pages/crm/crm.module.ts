import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CrmRoutingModule } from './crm-routing.module';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { crmFeatureKey, reducer } from './data/store/crm.reducer';

import { CrmComponent } from './crm.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

@NgModule({
  declarations: [CrmComponent, SideBarComponent, NavBarComponent],
  imports: [
    CommonModule,
    CrmRoutingModule,
    StoreModule.forFeature(crmFeatureKey, reducer),
    TranslateModule,
  ],
})
export class CrmModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CrmRoutingModule } from './crm-routing.module';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { crmFeatureKey, reducer } from './data-access/store/crm.reducer';

import { CrmComponent } from './crm.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DropdownLangComponent } from './components/nav-bar/components/drop-down-lang/drop-down-lang.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    CrmComponent,
    SideBarComponent,
    NavBarComponent,
    DropdownLangComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    StoreModule.forFeature(crmFeatureKey, reducer),
    TranslateModule,
  ],
})
export class CrmModule {}

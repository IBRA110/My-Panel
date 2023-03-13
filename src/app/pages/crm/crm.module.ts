import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownLangComponent } from './components/nav-bar/components/drop-down-lang/drop-down-lang.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CrmRoutingModule } from './crm-routing.module';
import { CrmComponent } from './crm.component';
import { crmFeatureKey, crmReducer } from './data-access/store/crm.reducer';

@NgModule({
  declarations: [
    CrmComponent,
    SideBarComponent,
    NavBarComponent,
    DropdownLangComponent,
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    StoreModule.forFeature(crmFeatureKey, crmReducer),
    TranslateModule,
  ],
})
export class CrmModule {}

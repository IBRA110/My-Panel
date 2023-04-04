import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { adminFeatureKey, reducer } from './data/store/admin.reducer';

import { AdminComponent } from './admin.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

@NgModule({
  declarations: [AdminComponent, SideBarComponent, NavBarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    StoreModule.forFeature(adminFeatureKey, reducer),
    TranslateModule,
  ],
})
export class AdminModule {}

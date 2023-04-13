import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { adminFeatureKey, reducer } from './data/store/admin.reducer';

import { AdminComponent } from './admin.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { AdminEffects } from './data/store/admin.effects';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [AdminComponent, SideBarComponent, NavBarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    StoreModule.forFeature(adminFeatureKey, reducer),
    EffectsModule.forFeature([AdminEffects]),
    TranslateModule,
  ],
})
export class AdminModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { RouterModule } from '@angular/router';
import { SignInModule } from './components/sign-in/sing-in.module';
import { SignUpModule } from './components/sign-up/sing-up.module';
import { StoreModule } from '@ngrx/store';
import {
  authenticationFeatureKey,
  reducer,
} from './data-assets/store/authentication.reduser';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    SignUpModule,
    SignInModule,
    RouterModule.forChild([{ path: '', component: AuthenticationComponent }]),
    StoreModule.forFeature(authenticationFeatureKey, reducer),
  ],
  exports: [],
})
export class AuthenticationModule {}

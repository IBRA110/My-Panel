import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { RouterModule } from '@angular/router';
import { SignInModule } from './pages/sign-in/sing-in.module';
import { SignUpModule } from './pages/sign-up/sing-up.module';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    SignUpModule,
    SignInModule,
    RouterModule.forChild([{ path: '', component: AuthenticationComponent }]),
  ],
  exports: [],
})
export class AuthenticationModule {}

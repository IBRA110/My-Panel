import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { RouterModule } from '@angular/router';
import { SignInModule } from './components/sign-in/sing-in.module';
import { SignUpModule } from './components/sign-up/sing-up.module';
import { UiButtonModule } from '../../core/ui/ui-button/ui-button.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    SignUpModule,
    SignInModule,
    UiButtonModule,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: AuthenticationComponent }]),
  ],
  exports: [],
})
export class AuthenticationModule {}

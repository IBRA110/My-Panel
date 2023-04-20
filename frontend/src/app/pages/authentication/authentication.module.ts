import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UiButtonComponent } from 'src/app/core/ui/ui-button/ui-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [AuthenticationComponent, SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiButtonComponent,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: AuthenticationComponent }]),
  ],
  exports: [],
})
export class AuthenticationModule {}

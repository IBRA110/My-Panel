import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UiButtonComponent } from 'src/app/core/ui/ui-button/ui-button.component';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiButtonComponent,
    TranslateModule,
  ],
  exports: [SignInComponent],
})
export class SignInModule {}

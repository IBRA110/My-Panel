import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UiButtonComponent } from 'src/app/core/ui/ui-button/ui-button.component';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiButtonComponent,
    TranslateModule,
  ],
  exports: [SignUpComponent],
})
export class SignUpModule {}

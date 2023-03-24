import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiButtonModule } from 'src/app/core/ui/ui-button/ui-button.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, ReactiveFormsModule, UiButtonModule, TranslateModule],
  exports: [SignUpComponent],
})
export class SignUpModule {}

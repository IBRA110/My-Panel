import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiButtonModule } from 'src/app/core/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, ReactiveFormsModule, UiButtonModule],
  exports: [SignUpComponent],
})
export class SignUpModule {}

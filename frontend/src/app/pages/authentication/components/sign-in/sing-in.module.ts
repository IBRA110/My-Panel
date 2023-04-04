import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiButtonModule } from 'src/app/core/ui/ui-button/ui-button.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, ReactiveFormsModule, UiButtonModule, TranslateModule],
  exports: [SignInComponent],
})
export class SignInModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule],
  exports: [SignUpComponent],
})
export class SignUpModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [SignInComponent],
})
export class SignInModule {}

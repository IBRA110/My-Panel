import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiPopupComponent } from './ui-popup.component';
import { ThemeModule } from '../../themes/theme.module';
import { darkTheme } from '../../themes/dark.theme';
import { lightTheme } from '../../themes/lignt.theme';

@NgModule({
  declarations: [UiPopupComponent],
  imports: [
    CommonModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light',
    }),
  ],
  exports: [UiPopupComponent],
})
export class UiPopupModule {}

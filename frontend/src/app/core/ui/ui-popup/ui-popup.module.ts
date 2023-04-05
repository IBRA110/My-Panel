import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiPopupComponent } from './ui-popup.component';
import { ThemeModule } from '../../theme/theme.module';
import { darkTheme } from '../../theme/themes/dark.theme';
import { lightTheme } from '../../theme/themes/lignt.theme';

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

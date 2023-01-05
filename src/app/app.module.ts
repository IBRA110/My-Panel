import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ThemeModule } from './core/theme/theme.module';
import { lightTheme } from './core/theme/themes/lignt.theme';
import { darkTheme } from './core/theme/themes/dark.theme';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

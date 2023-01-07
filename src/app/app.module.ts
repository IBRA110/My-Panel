import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './core/theme/theme.module';
import { lightTheme } from './core/theme/themes/lignt.theme';
import { darkTheme } from './core/theme/themes/dark.theme';
import { UiAlertMessagesModule } from './core/ui/ui-alert-messages/ui-alert-messages.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiAlertMessagesModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

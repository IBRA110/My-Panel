import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './core/themes/theme.module';
import { lightTheme } from './core/themes/lignt.theme';
import { darkTheme } from './core/themes/dark.theme';
import { ThemeService } from './core/services/theme.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import {
  authenticationFeatureKey,
  reducer,
} from './pages/authentication/data/store/authentication.reduser';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './pages/authentication/data/store/authentication.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { CoreModule } from './core/modules/core.module';
import { UiAlertMessagesComponent } from './core/ui/ui-alert-messages/ui-alert-messages.component';
import { UiPopupModule } from './core/ui/ui-popup/ui-popup.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiAlertMessagesComponent,
    HttpClientModule,
    BrowserAnimationsModule,
    UiPopupModule,
    CoreModule,
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
    StoreModule.forRoot({}),
    StoreModule.forFeature(authenticationFeatureKey, reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AuthenticationEffects]),
    GraphQLModule,
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

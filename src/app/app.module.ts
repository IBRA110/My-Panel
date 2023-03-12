import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './core/theme/theme.module';
import { lightTheme } from './core/theme/themes/lignt.theme';
import { darkTheme } from './core/theme/themes/dark.theme';
import { UiAlertMessagesModule } from './core/ui/ui-alert-messages/ui-alert-messages.module';
import { ThemeService } from './core/theme/theme.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import {
  authenticationFeatureKey,
  reducer,
} from './pages/authentication/data-access/store/authentication.reduser';
import {
  crmFeatureKey,
  crmReducer,
} from './pages/crm/data-access/store/crm.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './pages/authentication/data-access/store/authentication.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiAlertMessagesModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
    StoreModule.forFeature(crmFeatureKey, crmReducer),
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

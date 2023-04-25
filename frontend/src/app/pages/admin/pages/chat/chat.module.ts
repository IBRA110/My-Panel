import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { StoreModule } from '@ngrx/store';
import { chatFeatureKey, reducer } from './data/store/chat.reduser';
import { EffectsModule } from '@ngrx/effects';
import { ChatEffects } from './data/store/chat.effects';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RecipientComponent } from './components/recipient/recipient.component';
import { UiButtonComponent } from 'src/app/core/ui/ui-button/ui-button.component';

@NgModule({
  declarations: [
    ChatComponent,
    UsersListComponent,
    MessagesComponent,
    RecipientComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    UiButtonComponent,
    RouterModule.forChild([{ path: '', component: ChatComponent }]),
    StoreModule.forFeature(chatFeatureKey, reducer),
    EffectsModule.forFeature([ChatEffects]),
  ],
  exports: [],
  providers: [],
})
export class ChatModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { StoreModule } from '@ngrx/store';
import { chatFeatureKey, reducer } from './data/store/chat.reduser';
import { EffectsModule } from '@ngrx/effects';
import { ChatEffects } from './data/store/chat.effects';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: ChatComponent }]),
    StoreModule.forFeature(chatFeatureKey, reducer),
    EffectsModule.forFeature([ChatEffects]),
  ],
  exports: [],
  providers: [],
})
export class ChatModule {}

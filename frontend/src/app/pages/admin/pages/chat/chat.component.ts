import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { createChat, destroyChat, loadUsers } from './data/store/chat.actions';
import { selectOnlineUsers } from './data/store/chat.selectors';
import { Observable } from 'rxjs';
import { ChatUsers } from './data/interfaces/users.interface';
import { ChatService } from './data/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  public users$: Observable<ChatUsers[]> = this.store.select(selectOnlineUsers);

  public constructor(private store: Store, private chatService: ChatService) {}

  public ngOnInit(): void {
    this.store.dispatch(loadUsers({}));
  }

  public ngOnDestroy(): void {
    this.store.dispatch(destroyChat());
  }

  public createChatConnection(recipient: string): void {
    this.store.dispatch(createChat({ otherUsername: recipient }));
  }

  public sendMessage(message: string): void {
    console.log(message);
  }
}

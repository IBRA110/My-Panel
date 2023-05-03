import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  createChat,
  destroyChat,
  loadUsers,
  sendMessage,
} from './data/store/chat.actions';
import {
  selectMessageThread,
  selectOnlineUsers,
  selectRecipient,
} from './data/store/chat.selectors';
import { Observable } from 'rxjs';
import { ChatUsers } from './data/interfaces/users.interface';
import { Message } from './data/interfaces/messages.interface';
import { selectUserId } from '../../data/store/admin.selectors';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  public users$: Observable<ChatUsers[]> = this.store.select(selectOnlineUsers);
  public userId$: Observable<string> = this.store.select(selectUserId);
  public messagesThread$: Observable<Message[]> =
    this.store.select(selectMessageThread);

  private recipientUsername$: Observable<string> =
    this.store.select(selectRecipient);
  private recipientUsername: string;

  public constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(loadUsers({}));
    this.recipientUsername$.subscribe((n) => (this.recipientUsername = n));
  }

  public ngOnDestroy(): void {
    this.store.dispatch(destroyChat());
  }

  public createChatConnection(recipient: string): void {
    this.store.dispatch(createChat({ otherUsername: recipient }));
  }

  public sendMessage(message: string): void {
    this.store.dispatch(
      sendMessage({
        recipientUsername: this.recipientUsername,
        content: message,
      }),
    );
  }
}

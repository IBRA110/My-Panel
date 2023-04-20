import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from './data/store/chat.actions';
import { selectOnlineUsers } from './data/store/chat.selectors';
import { Observable } from 'rxjs';
import { ChatUsers } from './data/interfaces/users.interface';
import { ChatService } from './data/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public users$: Observable<ChatUsers[]> = this.store.select(selectOnlineUsers);

  public constructor(private store: Store, private chatService: ChatService) {}

  public ngOnInit(): void {
    this.store.dispatch(loadUsers({}));
  }

  public createChatConnection(recipient: string): void {
    console.log(recipient);
  }
}

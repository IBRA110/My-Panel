import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from './data/store/chat.actions';
import { selectOnlineUsers } from './data/store/chat.selectors';
import { Observable } from 'rxjs';
import { ChatUsers } from './data/interfaces/users.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public users$: Observable<ChatUsers[]> = this.store.select(selectOnlineUsers);

  public constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(loadUsers({}));
  }
}

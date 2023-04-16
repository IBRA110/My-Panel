import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from './data/store/chat.actions';
import { selectOnlineUsers } from './data/store/chat.selectors';
import { Observable } from 'rxjs';
import { ChatUsers } from './data/interfaces/users.interface';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public defaultAvatarUrl: string = '/assets/images/nav-bar/man.png/';
  public baseUrl: string = environment.baseUrl;
  public users$: Observable<ChatUsers[]> = this.store.select(selectOnlineUsers);
  public search$: FormControl = new FormControl();

  public constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(loadUsers({}));
    this.search$.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.store.dispatch(loadUsers({ userName: value }));
    });
  }
}

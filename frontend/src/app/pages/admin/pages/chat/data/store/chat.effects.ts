import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
  createChat,
  destroyChat,
  loadUsers,
  loadUsersFaled,
  loadUsersSuccess,
} from './chat.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { ChatUsers } from '../interfaces/users.interface';
import { Store } from '@ngrx/store';
import { selectOnlineUsers } from 'src/app/pages/admin/data/store/admin.selectors';

@Injectable()
export class ChatEffects {
  public constructor(
    private actions$: Actions,
    private chatService: ChatService,
    private store: Store,
  ) {}

  private loadUserEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      concatLatestFrom(() => [this.store.select(selectOnlineUsers)]),
      switchMap(([action, onlineUsers]) => {
        return this.chatService.getUsers(action).pipe(
          map((data) => {
            const users: ChatUsers[] = data.data.users
              .map((u) => {
                return {
                  firstName: u.firstName ? u.firstName : '',
                  id: u.id,
                  userName: u.userName,
                  lastActive: u.lastActive,
                  photoUrl: u.photoUrl,
                  lastName: !!u.lastName ? u.lastName : '',
                  isOnline: onlineUsers.some((id) => id === u.id),
                };
              })
              .sort((x) => (x.isOnline ? -1 : 1));
            return loadUsersSuccess({ users: users });
          }),
          catchError(() => {
            return of(loadUsersFaled());
          }),
        );
      }),
    );
  });

  private createChatHubConnectionEffect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createChat),
        tap((action) => {
          this.chatService.stopChatHubConnection();
          this.chatService.createChatHubConnection(action.otherUsername);
        }),
      );
    },
    { dispatch: false },
  );

  private stopChatHubConnectionEffect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(destroyChat),
        tap(() => {
          this.chatService.stopChatHubConnection();
        }),
      );
    },
    { dispatch: false },
  );
}

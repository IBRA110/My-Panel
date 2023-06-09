import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { UiAlertMessagesService } from './ui-alert-messages.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import {
  getCountOfUnreadMessages,
  getOnlineUser,
  getOnlineUsers,
  removeOfflineUser,
  setNewMessageCount,
} from 'src/app/pages/admin/data/store/admin.actions';
import { setRecipient } from 'src/app/pages/admin/pages/chat/data/store/chat.actions';
import { Router } from '@angular/router';
import { CountOfUnreadMessages } from '../interfaces/count-of-unread-messages.interface';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;

  public constructor(
    private alertMessageService: UiAlertMessagesService,
    private translateService: TranslateService,
    private store: Store,
    private router: Router,
  ) {}

  public createHubConnection(): void {
    const token: string = JSON.parse(localStorage.getItem('auth'))?.authTokens
      ?.accessToken;
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch((error: string) =>
        this.alertMessageService.callErrorMessage(error),
      );

    this.hubConnection.on('UserIsOnline', (userId: string) => {
      this.store.dispatch(getOnlineUser({ user: userId }));
    });

    this.hubConnection.on('UserIsOffline', (userId: string) => {
      this.store.dispatch(removeOfflineUser({ user: userId }));
    });

    this.hubConnection.on('GetOnlineUsers', (userIds: string[]) => {
      this.store.dispatch(getOnlineUsers({ users: userIds }));
    });

    this.hubConnection.on('NewMessageReceived', ({ username, knownAs }) => {
      this.store.dispatch(setNewMessageCount({ username: username }));
      this.alertMessageService.callNewMessage(
        username + this.translateService.instant('PRESENCE_SERVISE'),
        () => this.redirectToChat(username),
      );
    });

    this.hubConnection.on(
      'GetCountOfUnreadMessages',
      (countOfUnreadMessages: CountOfUnreadMessages) => {
        this.store.dispatch(
          getCountOfUnreadMessages({
            payload: countOfUnreadMessages,
          }),
        );
      },
    );
  }

  public stopHubConnection(): void {
    this.hubConnection
      .stop()
      .catch((error) => this.alertMessageService.callErrorMessage(error));
  }

  public redirectToChat(username: string): void {
    this.store.dispatch(setRecipient({ recipientUsername: username }));
    this.router.navigate(['admin/chat']);
  }
}

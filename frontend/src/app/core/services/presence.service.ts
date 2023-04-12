import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UiAlertMessagesService } from './ui-alert-messages.service';
import { TranslateService } from '@ngx-translate/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  public onlineUsers$ = this.onlineUsersSource.asObservable();

  public constructor(
    private alertMessageService: UiAlertMessagesService,
    private translateService: TranslateService,
  ) {}

  public createHubConnection() {
    const token: string = JSON.parse(localStorage.getItem('auth'))?.authTokens
      ?.accessToken;
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('UserIsOnline', (username) => {
      this.onlineUsers$
        .pipe(take(1), untilDestroyed(this))
        .subscribe((usernames) => {
          this.onlineUsersSource.next([...usernames, username]);
        });
    });

    this.hubConnection.on('UserIsOffline', (username: string) => {
      this.onlineUsers$
        .pipe(take(1), untilDestroyed(this))
        .subscribe((usernames) => {
          this.onlineUsersSource.next([
            ...usernames.filter((x) => x !== username),
          ]);
        });
    });

    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsersSource.next(usernames);
    });

    this.hubConnection.on('NewMessageReceived', ({ username, knownAs }) => {
      this.alertMessageService.callInfoMessage(
        knownAs + this.translateService.instant('PRESENCE_SERVISE'),
      );
    });
  }

  public stopHubConnection() {
    this.hubConnection.stop().catch((error) => console.log(error));
  }
}

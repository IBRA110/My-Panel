import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';

export class ChatService {
  private baseUrl = environment.baseUrl;
  private hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private messageThreadSource = new BehaviorSubject<any[]>([]);
  private messageThread$ = this.messageThreadSource.asObservable();

  public constructor() {}

  public createHubConnection(user: any, otherUsername: string): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('ReceiveMessageThread', (messages) => {
      this.messageThreadSource.next(messages);
    });

    this.hubConnection.on('NewMessage', (message) => {
      this.messageThread$.pipe(take(1)).subscribe((messages) => {
        this.messageThreadSource.next([...messages, message]);
      });
    });

    this.hubConnection.on('UpdatedGroup', (group: any) => {
      if (group.connections.some((x) => x.username === otherUsername)) {
        this.messageThread$.pipe(take(1)).subscribe((messages) => {
          messages.forEach((message) => {
            if (!message.dateRead) {
              message.dateRead = new Date(Date.now());
            }
          });
          this.messageThreadSource.next([...messages]);
        });
      }
    });
  }

  public stopHubConnection(): void {
    if (this.hubConnection) {
      this.messageThreadSource.next([]);
      this.hubConnection.stop();
    }
  }

  // public getMessageThread(username: string) {
  //   return this.http.get<any[]>(this.baseUrl + 'messages/thread/' + username);
  // }

  public async sendMessage(
    username: string,
    content: string,
  ): Promise<HubConnection> {
    return this.hubConnection
      .invoke('SendMessage', { recipientUsername: username, content })
      .catch((error) => console.log(error));
  }

  // public deleteMessage(id: number) {
  //   return this.http.delete(this.baseUrl + 'messages/' + id);
  // }
}

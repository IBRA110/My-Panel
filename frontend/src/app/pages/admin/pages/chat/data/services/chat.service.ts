import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS } from '../gql/get-users.gql';
import { ApolloQueryResult } from '@apollo/client';
import { GetUsersQuery, GetUsersQueryVariables } from 'src/generated/graphql';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Group } from '../interfaces/group.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private messageThreadSource = new BehaviorSubject<any[]>([]);
  private messageThread$ = this.messageThreadSource.asObservable();
  public constructor(private apollo: Apollo) {}

  public getUsers(
    variables: GetUsersQueryVariables,
  ): Observable<ApolloQueryResult<GetUsersQuery>> {
    return this.apollo.query<GetUsersQuery>({
      query: GET_USERS,
      variables,
    });
  }

  public createHubConnection(otherUsername: string): void {
    const token: string = JSON.parse(localStorage.getItem('auth'))?.authTokens
      ?.accessToken;
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => token,
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

    this.hubConnection.on('UpdatedGroup', (group: Group) => {
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

  public async sendMessage(
    username: string,
    content: string,
  ): Promise<HubConnection> {
    return this.hubConnection
      .invoke('SendMessage', { recipientUsername: username, content })
      .catch((error) => console.log(error));
  }

  public deleteMessage(id: number): void {
    console.log(1);
  }
}

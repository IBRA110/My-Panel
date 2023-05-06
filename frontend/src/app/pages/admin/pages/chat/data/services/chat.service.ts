import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS } from '../gql/get-users.gql';
import { ApolloQueryResult } from '@apollo/client';
import { GetUsersQuery, GetUsersQueryVariables } from 'src/generated/graphql';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Group } from '../interfaces/group.interface';
import { UiAlertMessagesService } from 'src/app/core/services/ui-alert-messages.service';
import { Message } from '../interfaces/messages.interface';
import { Store } from '@ngrx/store';
import {
  messageDeleted,
  newMessage,
  receiveMessageThread,
  setRecipient,
  updatedGroup,
} from '../store/chat.actions';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;

  public constructor(
    private apollo: Apollo,
    private alertMessageService: UiAlertMessagesService,
    private store: Store,
  ) {}

  public getUsers(
    variables: GetUsersQueryVariables,
  ): Observable<ApolloQueryResult<GetUsersQuery>> {
    return this.apollo.query<GetUsersQuery>({
      query: GET_USERS,
      variables,
    });
  }

  public createChatHubConnection(otherUsername: string): void {
    const token: string = JSON.parse(localStorage.getItem('auth'))?.authTokens
      ?.accessToken;
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() =>
        this.store.dispatch(setRecipient({ recipientUsername: otherUsername })),
      )
      .catch((error) => this.alertMessageService.callErrorMessage(error));

    this.hubConnection.on('ReceiveMessageThread', (messages: Message[]) => {
      this.store.dispatch(receiveMessageThread({ messages: messages }));
    });

    this.hubConnection.on('NewMessage', (message: Message) => {
      this.store.dispatch(newMessage({ message: message }));
    });

    this.hubConnection.on('DeletedMessage', (id: string) => {
      this.store.dispatch(messageDeleted({ id: id }));
    });

    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      this.store.dispatch(
        updatedGroup({ group: group, otherUsername: otherUsername }),
      );
    });
  }

  public stopChatHubConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  public async sendMessage(
    recipientUsername: string,
    content: string,
  ): Promise<HubConnection> {
    return this.hubConnection
      .invoke('SendMessage', {
        recipientUsername: recipientUsername,
        content: content,
      })
      .catch((error) => this.alertMessageService.callErrorMessage(error));
  }

  public deleteMessage(id: string): Promise<HubConnection> {
    return this.hubConnection
      .invoke('DeleteMessage', id)
      .catch((error) => this.alertMessageService.callErrorMessage(error));
  }
}

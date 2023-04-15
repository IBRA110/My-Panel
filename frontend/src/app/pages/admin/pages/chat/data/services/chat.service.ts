import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS } from '../gql/get-users.gql';
import { ApolloQueryResult } from '@apollo/client';
import { GetUsersQuery, GetUsersQueryVariables } from 'src/generated/graphql';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public constructor(private apollo: Apollo) {}

  public getUsers(
    variables: GetUsersQueryVariables,
  ): Observable<ApolloQueryResult<GetUsersQuery>> {
    return this.apollo.query<GetUsersQuery>({
      query: GET_USERS,
      variables,
    });
  }
}

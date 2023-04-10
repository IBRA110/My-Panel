import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  GetUserQuery,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from 'src/generated/graphql';
import { GET_USER } from '../gql/get-user.gql';
import { UPDATE_USER } from '../gql/update-user.gql';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public constructor(private apollo: Apollo) {}

  public getUser(): Observable<ApolloQueryResult<GetUserQuery>> {
    return this.apollo.query<GetUserQuery>({ query: GET_USER });
  }

  public updateUser(
    payload: UpdateUserMutationVariables,
  ): Observable<MutationResult<UpdateUserMutation>> {
    return this.apollo.mutate<UpdateUserMutation>({
      mutation: UPDATE_USER,
      variables: payload,
    });
  }
}

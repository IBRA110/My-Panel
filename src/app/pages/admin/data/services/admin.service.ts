import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GetUserQuery } from 'src/generated/graphql';
import { GET_USER } from '../gql/get-user.gql';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public constructor(private apollo: Apollo) {}

  public getUser(): Observable<ApolloQueryResult<GetUserQuery>> {
    return this.apollo.query<GetUserQuery>({ query: GET_USER });
  }
}

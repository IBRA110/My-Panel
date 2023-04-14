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
import { AvatarUrl } from '../interfaces/user.interfase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public constructor(private apollo: Apollo, private http: HttpClient) {}

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

  public loadAvatar(file: File): Observable<AvatarUrl> {
    const token: string = JSON.parse(localStorage.getItem('auth'))?.authTokens
      ?.accessToken;
    const header = {
      headers: new HttpHeaders().set('authorization', `bearer ${token}`),
    };

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<AvatarUrl>(
      environment.baseUrl + '/api/v1/Users/upload-avatar',
      formData,
      header,
    );
  }
}

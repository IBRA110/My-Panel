import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthTokens, SignIn } from '../interfaces/auth.interface';
import {
  AccountMutationsMutation,
  AccountMutationsMutationVariables,
} from 'src/generated/graphql';
import { Apollo, MutationResult } from 'apollo-angular';
import { REGISTRATION } from '../gql/registration.gql';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public constructor(private http: HttpClient, private apollo: Apollo) {}

  public signUp(
    payload: AccountMutationsMutationVariables,
  ): Observable<MutationResult<AccountMutationsMutation>> {
    return this.apollo.mutate<AccountMutationsMutation>({
      mutation: REGISTRATION,
      variables: {
        email: payload.email,
        userName: payload.userName,
        password: payload.password,
      },
    });
  }

  public signIn(account: SignIn): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(
      environment.baseUrl + 'users/authenticate',
      account,
    );
  }
}

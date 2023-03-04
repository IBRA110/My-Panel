import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginMutation,
  LoginMutationVariables,
  RefreshMutation,
  RefreshMutationVariables,
  RegistrationMutation,
  RegistrationMutationVariables,
} from 'src/generated/graphql';
import { Apollo, MutationResult } from 'apollo-angular';
import { REGISTRATION } from '../gql/registration.gql';
import { LOGIN } from '../gql/login.gql';
import { REFRESH } from '../gql/refresh.gql';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public constructor(private _apollo: Apollo) {}

  public signUp(
    payload: RegistrationMutationVariables,
  ): Observable<MutationResult<RegistrationMutation>> {
    return this._apollo.mutate<RegistrationMutation>({
      mutation: REGISTRATION,
      variables: payload,
    });
  }

  public signIn(
    payload: LoginMutationVariables,
  ): Observable<MutationResult<LoginMutation>> {
    return this._apollo.mutate<LoginMutation>({
      mutation: LOGIN,
      variables: payload,
    });
  }

  public refresh(
    payload: RefreshMutationVariables,
  ): Observable<MutationResult<RefreshMutation>> {
    return this._apollo.mutate<RefreshMutation>({
      mutation: REFRESH,
      variables: payload,
    });
  }
}

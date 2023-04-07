import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  GetUserQuery,
  UploadUserImageMutation,
  UploadUserImageMutationVariables,
} from 'src/generated/graphql';
import { GET_USER } from '../gql/get-user.gql';
import { UPLOAD_USER_IMAGE } from '../gql/upload-image.gql';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public constructor(private apollo: Apollo) {}

  public getUser(): Observable<ApolloQueryResult<GetUserQuery>> {
    return this.apollo.query<GetUserQuery>({ query: GET_USER });
  }

  public uploadUserImage(
    payload: UploadUserImageMutationVariables,
  ): Observable<MutationResult<UploadUserImageMutation>> {
    return this.apollo.mutate<UploadUserImageMutation>({
      mutation: UPLOAD_USER_IMAGE,
      variables: payload,
    });
  }
}

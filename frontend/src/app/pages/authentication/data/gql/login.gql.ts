import { gql } from 'apollo-angular';

export const LOGIN = gql`
  mutation Login($userName: String, $password: String) {
    login(userName: $userName, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

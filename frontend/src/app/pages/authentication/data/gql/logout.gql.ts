import { gql } from 'apollo-angular';

export const LOGOUT = gql`
  mutation logout($refreshToken: String) {
    logout(refreshToken: $refreshToken) {
      message
    }
  }
`;

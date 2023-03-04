import { gql } from 'apollo-angular';

export const REFRESH = gql`
  mutation Refresh($refreshToken: String) {
    refresh(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

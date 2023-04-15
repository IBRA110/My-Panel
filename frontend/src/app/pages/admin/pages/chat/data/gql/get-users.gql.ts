import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  query GetUsers($userName: String) {
    users(userName: $userName) {
      id
      userName
      firstName
      lastName
      lastActive
      photoUrl
    }
  }
`;

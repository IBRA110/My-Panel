import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  query GetUsers {
    users(userName: null) {
      id
      userName
      firstName
      lastName
      lastActive
      photoUrl
    }
  }
`;

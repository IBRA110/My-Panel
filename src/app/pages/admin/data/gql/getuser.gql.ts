import { gql } from 'apollo-angular';

export const GETUSER = gql`
  query getUser {
    user {
      id
      userName
      firstName
      lastName
      images {
        id
        isMain
      }
    }
  }
`;

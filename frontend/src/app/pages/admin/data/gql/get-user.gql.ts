import { gql } from 'apollo-angular';

export const GET_USER = gql`
  query getUser {
    user {
      id
      userName
      firstName
      lastName
      images {
        id
        isMain
        url
      }
    }
  }
`;

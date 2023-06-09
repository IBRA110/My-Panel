import { gql } from 'apollo-angular';

export const GET_MEMBER = gql`
  query GetMember($userName: String) {
    member(userName: $userName) {
      id
      firstName
      lastName
      lastActive
      photoUrl
      age
      interests
      introduction
      city
      country
    }
  }
`;

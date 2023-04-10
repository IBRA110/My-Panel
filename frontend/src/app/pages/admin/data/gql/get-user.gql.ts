import { gql } from 'apollo-angular';

export const GET_USER = gql`
  query GetUser {
    user {
      id
      userName
      firstName
      introduction
      interests
      city
      country
      lastName
      photoUrl
      dateOfBirth
      age
      images {
        url
        isMain
      }
    }
  }
`;

import { gql } from 'apollo-angular';

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $firstName: String
    $lastName: String
    $dateOfBirth: DateTime!
    $introduction: String
    $interests: String
    $city: String
    $country: String
    $file: Upload
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      introduction: $introduction
      interests: $interests
      city: $city
      country: $country
      file: $file
    ) {
      firstName
      lastName
      dateOfBirth
      introduction
      interests
      city
      country
      photoUrl
    }
  }
`;

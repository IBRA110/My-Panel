import { gql } from 'apollo-angular';

export const REGISTRATION = gql`
  mutation AccountMutations(
    $userName: String
    $email: String
    $password: String
  ) {
    registration(userName: $userName, email: $email, password: $password) {
      message
    }
  }
`;

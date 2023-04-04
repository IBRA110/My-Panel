import { gql } from 'apollo-angular';

export const REGISTRATION = gql`
  mutation Registration($userName: String, $email: String, $password: String) {
    registration(userName: $userName, email: $email, password: $password) {
      message
    }
  }
`;

import { gql } from 'apollo-angular';

export const UPDATE_USER = gql`
  mutation UploadUserAvatar($file: Upload) {
    uploadUserAvatar(file: $file) {
      url
    }
  }
`;

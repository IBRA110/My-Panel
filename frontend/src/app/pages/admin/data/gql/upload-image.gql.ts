import { gql } from 'apollo-angular';

export const UPLOAD_USER_IMAGE = gql`
  mutation UploadUserImage($file: Upload) {
    uploadUserImage(file: $file) {
      url
    }
  }
`;

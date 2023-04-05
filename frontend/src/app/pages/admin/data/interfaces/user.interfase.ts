export interface UserForNavBar {
  id?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  images?: UserImage[];
}

export interface UserImage {
  id?: string;
  isMain: boolean;
  url?: string;
}

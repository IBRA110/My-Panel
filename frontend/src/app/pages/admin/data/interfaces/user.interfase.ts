export interface UserForNavBar {
  id?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  images?: {
    id?: string;
    isMain: boolean;
  }[];
}

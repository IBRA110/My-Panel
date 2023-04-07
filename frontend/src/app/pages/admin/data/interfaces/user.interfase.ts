export interface User {
  id?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  images?: UserImage[];
  introduction?: string;
  interests?: string;
  city?: string;
  photoUrl?: string;
  dateOfBirth: Date;
  age: number;
}

export interface UserImage {
  id?: string;
  isMain: boolean;
  url?: string;
}

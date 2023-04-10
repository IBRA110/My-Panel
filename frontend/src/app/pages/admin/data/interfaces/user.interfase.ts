export interface User {
  id?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  images?: UserImage[];
  introduction?: string;
  interests?: string;
  city?: string;
  country?: string;
  photoUrl?: string;
  dateOfBirth: Date;
  age: number;
}

export interface UserImage {
  id?: string;
  isMain: boolean;
  url?: string;
}

export interface UpdateUser {
  firstName?: string;
  lastName?: string;
  interests?: string;
  introduction?: string;
  city?: string;
  country?: string;
  dateOfBirth: Date;
}

export interface UpdatedUser {
  firstName?: string;
  lastName?: string;
  dateOfBirth: any;
  introduction?: string;
  interests?: string;
  city?: string;
  country?: string;
}
export interface AvatarUrl {
  url: string;
}

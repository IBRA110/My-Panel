export interface ChatUsers {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  lastActive: string;
  photoUrl: string;
  isOnline: boolean;
}

export interface Recipient {
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  lastActive: any;
  photoUrl?: string | null;
  age: number;
  interests?: string | null;
  introduction?: string | null;
  city?: string | null;
  country?: string | null;
}

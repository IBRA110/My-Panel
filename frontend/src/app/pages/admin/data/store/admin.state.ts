import { User } from '../interfaces/user.interfase';

export interface AdminState {
  isSideBarToggled: boolean;
  user: User;
  onlineUsers: string[];
}

export const initialState: AdminState = {
  isSideBarToggled: false,
  user: null,
  onlineUsers: null,
};

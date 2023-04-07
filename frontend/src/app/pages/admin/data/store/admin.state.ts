import { User } from '../interfaces/user.interfase';

export interface AdminState {
  isSideBarToggled: boolean;
  user: User;
}

export const initialState: AdminState = {
  isSideBarToggled: false,
  user: null,
};

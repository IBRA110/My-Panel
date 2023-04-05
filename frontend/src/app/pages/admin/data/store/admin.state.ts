import { UserForNavBar } from '../interfaces/user.interfase';

export interface AdminState {
  isSideBarToggled: boolean;
  user: UserForNavBar;
}

export const initialState: AdminState = {
  isSideBarToggled: false,
  user: null,
};

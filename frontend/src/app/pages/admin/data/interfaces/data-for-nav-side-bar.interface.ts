import { User } from './user.interfase';

export interface DataForNavSideBar {
  isSideBarToggled: boolean;
  user: User;
  totalCountOfUnreadMessages: number;
}

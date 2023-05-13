import { CountOfUnreadMessages } from 'src/app/core/interfaces/count-of-unread-messages.interface';
import { User } from '../interfaces/user.interfase';

export interface AdminState {
  isSideBarToggled: boolean;
  user: User;
  onlineUsers: string[];
  countOfUnreadMessages: CountOfUnreadMessages;
}

export const initialState: AdminState = {
  isSideBarToggled: false,
  user: null,
  onlineUsers: null,
  countOfUnreadMessages: null,
};

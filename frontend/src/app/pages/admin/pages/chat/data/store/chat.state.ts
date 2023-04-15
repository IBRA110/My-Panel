import { ChatUsers } from '../interfaces/users.interface';

export interface ChatState {
  users: ChatUsers[];
}

export const initialState: ChatState = {
  users: null,
};

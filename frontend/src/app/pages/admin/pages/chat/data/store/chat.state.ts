import { Message } from '../interfaces/messages.interface';
import { ChatUsers } from '../interfaces/users.interface';

export interface ChatState {
  users: ChatUsers[];
  messages: Message[];
}

export const initialState: ChatState = {
  users: null,
  messages: null,
};

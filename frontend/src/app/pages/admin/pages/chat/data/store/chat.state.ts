import { Message } from '../interfaces/messages.interface';
import { ChatUsers, Recipient } from '../interfaces/users.interface';

export interface ChatState {
  users: ChatUsers[];
  messages: Message[];
  recipientUserName: string;
  recipient: Recipient;
}

export const initialState: ChatState = {
  users: null,
  messages: null,
  recipientUserName: null,
  recipient: null,
};

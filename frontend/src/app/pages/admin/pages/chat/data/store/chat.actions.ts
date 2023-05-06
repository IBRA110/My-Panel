import { createAction, props } from '@ngrx/store';
import { ChatActionsEnum } from './chat.enum';
import { ChatUsers, Recipient } from '../interfaces/users.interface';
import { Message } from '../interfaces/messages.interface';
import { Group } from '../interfaces/group.interface';

export const loadUsers = createAction(
  ChatActionsEnum.LOAD_USERS,
  props<{ userName?: string }>(),
);

export const loadUsersSuccess = createAction(
  ChatActionsEnum.LOAD_USERS_SUCCESS,
  props<{ users: ChatUsers[] }>(),
);

export const loadUsersFaled = createAction(ChatActionsEnum.LOAD_USERS_SUCCESS);

export const loadRecipientSuccess = createAction(
  ChatActionsEnum.LOAD_RECIPIENT_SUCCESS,
  props<{ recipient: Recipient }>(),
);

export const loadRecipientFaled = createAction(
  ChatActionsEnum.LOAD_RECIPIENT_FAILED,
);

export const createChat = createAction(
  ChatActionsEnum.CREATE_CHAT,
  props<{ otherUsername: string }>(),
);

export const destroyChat = createAction(ChatActionsEnum.DESTROY_CHAT);

export const receiveMessageThread = createAction(
  ChatActionsEnum.RECEIVE_MESSAGE_THREAD,
  props<{ messages: Message[] }>(),
);

export const newMessage = createAction(
  ChatActionsEnum.NEW_MESSAGE,
  props<{ message: Message }>(),
);

export const updatedGroup = createAction(
  ChatActionsEnum.UPDATED_GROUP,
  props<{ group: Group; otherUsername: string }>(),
);

export const sendMessage = createAction(
  ChatActionsEnum.SEND_MESSAGE,
  props<{ recipientUsername: string; content: string }>(),
);

export const sendMessageSuccess = createAction(
  ChatActionsEnum.SEND_MESSAGE_SUCCESS,
);

export const sendMessageFailed = createAction(
  ChatActionsEnum.SEND_MESSAGE_FAILED,
);

export const deleteMessage = createAction(
  ChatActionsEnum.DELETE_MESSAGE,
  props<{ id: string }>(),
);

export const deleteMessageSuccess = createAction(
  ChatActionsEnum.DELETE_MESSAGE_SUCCESS,
);

export const deleteMessageFailed = createAction(
  ChatActionsEnum.DELETE_MESSAGE_FAILED,
);

export const messageDeleted = createAction(
  ChatActionsEnum.MESSAGE_DELETED,
  props<{ id: string }>(),
);

export const setRecipient = createAction(
  ChatActionsEnum.SET_RECIPIENT,
  props<{ recipientUsername: string }>(),
);

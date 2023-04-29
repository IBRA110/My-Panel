import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from './chat.state';

const selectChatState = createFeatureSelector<ChatState>('chat');

export const selectOnlineUsers = createSelector(
  selectChatState,
  (chatState: ChatState) => chatState?.users,
);

export const selectMessageThread = createSelector(
  selectChatState,
  (chatState: ChatState) => chatState?.messages,
);

export const selectRecipient = createSelector(
  selectChatState,
  (chatState: ChatState) => chatState?.recipientUserName,
);

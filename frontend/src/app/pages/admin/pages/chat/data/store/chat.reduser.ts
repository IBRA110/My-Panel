import { Action, on } from '@ngrx/store';
import { ChatState, initialState } from './chat.state';
import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import {
  loadUsersSuccess,
  newMessage,
  receiveMessageThread,
  updatedGroup,
} from './chat.actions';
import {
  getOnlineUser,
  removeOfflineUser,
} from 'src/app/pages/admin/data/store/admin.actions';

export const chatFeatureKey = 'chat';

const chatReducer = createRehydrateReducer(
  chatFeatureKey,
  initialState,
  on(loadUsersSuccess, (state, action) => ({
    ...state,
    users: action.users,
  })),
  on(getOnlineUser, (state, { user }) => ({
    ...state,
    users: [
      ...state.users.map((element) => {
        if (element.id === user) {
          return {
            ...element,
            isOnline: true,
          };
        }
        return element;
      }),
    ].sort((x) => (x.isOnline ? -1 : 1)),
  })),
  on(removeOfflineUser, (state, { user }) => ({
    ...state,
    users: [
      ...state.users.map((element) => {
        if (element.id === user) {
          return {
            ...element,
            isOnline: false,
          };
        }
        return element;
      }),
    ].sort((x) => (x.isOnline ? -1 : 1)),
  })),
  on(receiveMessageThread, (state, action) => ({
    ...state,
    messages: action.messages,
  })),
  on(newMessage, (state, action) => ({
    ...state,
    messages: [...state.messages, action.message],
  })),
  on(updatedGroup, (state, action) => ({
    ...state,
    messages: action.group.connections.some(
      (x) => x.username === action.otherUsername,
    )
      ? [
          ...state.messages.map((message) => {
            return {
              ...message,
              dateRead: new Date(Date.now()),
            };
          }),
        ]
      : state.messages,
  })),
);

export function reducer(state: ChatState | undefined, action: Action) {
  return chatReducer(state, action);
}

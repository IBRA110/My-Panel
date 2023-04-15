import { Action, on } from '@ngrx/store';
import { ChatState, initialState } from './chat.state';
import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import { loadUsersSuccess } from './chat.actions';
import {
  getOnlineUser,
  removeOfflineUser,
} from 'src/app/pages/admin/data/store/admin.actions';

export const chatFeatureKey = 'chat';

const chatReducer = createRehydrateReducer(
  chatFeatureKey,
  initialState,
  on(loadUsersSuccess, (state, users) => ({
    ...state,
    users: users.users,
  })),
  on(getOnlineUser, (state, { user }) => ({
    ...state,
    users: [
      ...state.users.map((element) => {
        if (element.id === user) {
          return {
            id: element.id,
            firstName: element.firstName,
            lastName: element.lastName,
            lastActive: element.lastActive,
            photoUrl: element.photoUrl,
            userName: element.userName,
            isOnline: true,
          };
        }
        return element;
      }),
    ],
  })),
  on(removeOfflineUser, (state, { user }) => ({
    ...state,
    users: [
      ...state.users.map((element) => {
        if (element.id === user) {
          return {
            id: element.id,
            firstName: element.firstName,
            lastName: element.lastName,
            lastActive: element.lastActive,
            photoUrl: element.photoUrl,
            userName: element.userName,
            isOnline: false,
          };
        }
        return element;
      }),
    ],
  })),
);

export function reducer(state: ChatState | undefined, action: Action) {
  return chatReducer(state, action);
}

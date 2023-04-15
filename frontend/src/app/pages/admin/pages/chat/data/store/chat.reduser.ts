import { Action, on } from '@ngrx/store';
import { ChatState, initialState } from './chat.state';
import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import { loadUsersSuccess } from './chat.actions';

export const chatFeatureKey = 'chat';

const chatReducer = createRehydrateReducer(
  chatFeatureKey,
  initialState,
  on(loadUsersSuccess, (state, users) => ({
    ...state,
    users: users.users,
  })),
);

export function reducer(state: ChatState | undefined, action: Action) {
  return chatReducer(state, action);
}

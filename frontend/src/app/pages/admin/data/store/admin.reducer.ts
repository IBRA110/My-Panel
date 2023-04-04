import { Action, on } from '@ngrx/store';
import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import { toggleSidebar } from './admin.actions';
import { AdminState, initialState } from './admin.state';

export const adminFeatureKey = 'admin';

const adminReducer = createRehydrateReducer(
  adminFeatureKey,
  initialState,
  on(toggleSidebar, (state) => ({
    ...state,
    isSideBarToggled: !state.isSideBarToggled,
  })),
);

export function reducer(state: AdminState | undefined, action: Action) {
  return adminReducer(state, action);
}

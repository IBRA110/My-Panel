import { Action, on } from '@ngrx/store';
import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import {
  loadUserSuccess,
  toggleSidebar,
  updateUserSuccess,
} from './admin.actions';
import { AdminState, initialState } from './admin.state';

export const adminFeatureKey = 'admin';

const adminReducer = createRehydrateReducer(
  adminFeatureKey,
  initialState,
  on(toggleSidebar, (state) => ({
    ...state,
    isSideBarToggled: !state.isSideBarToggled,
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
  })),
  on(updateUserSuccess, (state, { updateUser }) => ({
    ...state,
    user: {
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      dateOfBirth: updateUser.dateOfBirth,
      introduction: updateUser.introduction,
      interests: updateUser.interests,
      city: updateUser.city,
      country: updateUser.country,
      photoUrl: updateUser.photoUrl,
      age: state.user.age,
    },
  })),
);

export function reducer(state: AdminState | undefined, action: Action) {
  return adminReducer(state, action);
}

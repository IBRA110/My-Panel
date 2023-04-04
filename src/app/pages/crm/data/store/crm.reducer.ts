import { Action, on } from '@ngrx/store';
import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import { reverseSideBar, toggleSidebar } from './crm.actions';
import { CrmState, initialState } from './crm.state';

export const crmFeatureKey = 'crm';

const crmReducer = createRehydrateReducer(
  crmFeatureKey,
  initialState,
  on(toggleSidebar, (state) => ({
    ...state,
    isSidebarToggled: !state.isSidebarToggled,
  })),
  on(reverseSideBar, (state, { payload }) => ({
    ...state,
    isSidebarReverse: payload,
  })),
);

export function reducer(state: CrmState | undefined, action: Action) {
  return crmReducer(state, action);
}

import { Action, on } from '@ngrx/store';
import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import { toggleSidebar } from './crm.actions';
import { CrmState, initialState } from './crm.state';

export const crmFeatureKey = 'crm';

export const crmReducer = createRehydrateReducer(
  crmFeatureKey,
  initialState,
  on(toggleSidebar, (state, { payload }) => ({
    ...state,
    isSidebarToggled: payload,
  })),
);

// export function reducer(state: CrmState | undefined, action: Action) {
//   return crmReducer(state, action);
// }

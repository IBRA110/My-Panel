export interface CrmState {
  isSidebarToggled: boolean;
  isSidebarReverse: boolean;
}

export const initialState: CrmState = {
  isSidebarToggled: false,
  isSidebarReverse: false,
};

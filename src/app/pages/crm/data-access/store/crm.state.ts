export interface CrmState {
  isSidebarToggled: boolean;
  isSidebarRtl: boolean;
}

export const initialState: CrmState = {
  isSidebarToggled: false,
  isSidebarRtl: false,
};

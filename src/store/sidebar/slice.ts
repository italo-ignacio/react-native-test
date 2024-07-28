import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SidebarState {
  open: boolean;
}

const initialState: SidebarState = {
  open: false
};

const SidebarSlice = createSlice({
  initialState,
  name: 'sidebar',
  reducers: {
    setSidebar(state: SidebarState, action: PayloadAction<boolean>) {
      state.open = action.payload;
    }
  }
});

export default SidebarSlice.reducer;

export const {
  reducer: sidebarReducer,
  actions: { setSidebar }
} = SidebarSlice;

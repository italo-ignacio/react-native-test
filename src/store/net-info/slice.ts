import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface NetInfoState {
  hasInternetConnection: boolean;
  selectOpen: string | null;
}

const initialState: NetInfoState = {
  hasInternetConnection: true,
  selectOpen: null
};

const netInfoSlice = createSlice({
  initialState,
  name: 'netInfo',
  reducers: {
    setInternetConnection(state: NetInfoState, action: PayloadAction<boolean>) {
      state.hasInternetConnection = action.payload;
    },
    setSelectOpen(state: NetInfoState, action: PayloadAction<string | null>) {
      state.selectOpen = action.payload;
    }
  }
});

export default netInfoSlice.reducer;

export const {
  reducer: netInfoReducer,
  actions: { setInternetConnection, setSelectOpen }
} = netInfoSlice;

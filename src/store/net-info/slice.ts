import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface NetInfoState {
  hasInternetConnection: boolean;
}

const initialState: NetInfoState = {
  hasInternetConnection: true
};

const netInfoSlice = createSlice({
  initialState,
  name: 'netInfo',
  reducers: {
    setInternetConnection(state: NetInfoState, action: PayloadAction<boolean>) {
      state.hasInternetConnection = action.payload;
    }
  }
});

export default netInfoSlice.reducer;

export const {
  reducer: netInfoReducer,
  actions: { setInternetConnection }
} = netInfoSlice;

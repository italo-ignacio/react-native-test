import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type synchronizeState = 'finishedSyncing' | 'isSynchronizing' | 'nothingToSynchronize';

interface Synchronize {
  totalToSynchronize: number | null;
  countOfSynchronized: number | null;
  state: synchronizeState;
}
export interface NetInfoState {
  hasInternetConnection: boolean;
  selectOpen: string | null;
  synchronize: Synchronize;
}

const initialState: NetInfoState = {
  hasInternetConnection: true,
  selectOpen: null,
  synchronize: {
    countOfSynchronized: null,
    state: 'nothingToSynchronize',
    totalToSynchronize: null
  }
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
    },
    setSynchronize(state: NetInfoState, action: PayloadAction<Synchronize>) {
      state.synchronize = action.payload;
    }
  }
});

export default netInfoSlice.reducer;

export const {
  reducer: netInfoReducer,
  actions: { setInternetConnection, setSelectOpen, setSynchronize }
} = netInfoSlice;

import { createSlice } from '@reduxjs/toolkit';
import { encryptData } from 'main/utils/crypto';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserProps } from 'domain/models';

interface PersistState {
  accessToken: string | null;
  user: string | null;
  theme: 'dark' | 'light';
}

const initialState: PersistState = {
  accessToken: null,
  theme: 'light',
  user: null
};

const persistSlice = createSlice({
  initialState,
  name: 'persist',
  reducers: {
    logout(state: PersistState) {
      state.accessToken = null;
      state.user = null;
    },
    setAuth(state: PersistState, action: PayloadAction<{ accessToken: string; user: UserProps }>) {
      state.accessToken = encryptData(action.payload.accessToken);
      state.user = encryptData(JSON.stringify(action.payload.user));
    },
    setTheme(state: PersistState, action: PayloadAction<'dark' | 'light'>) {
      state.theme = action.payload;
    }
  }
});

export const {
  reducer: persistReducer,
  actions: { setAuth, logout, setTheme }
} = persistSlice;

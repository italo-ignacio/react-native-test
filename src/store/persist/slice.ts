import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserProps } from 'domain/models';

interface PersistState {
  accessToken: string | null;
  user: UserProps | null;
  synchronizeApiData: {
    vehicle: Date | string | null;
    vehicleBrand: Date | string | null;
    vehicleModel: Date | string | null;
  };
  theme: 'dark' | 'light';
}

const initialState: PersistState = {
  accessToken: null,
  synchronizeApiData: {
    vehicle: null,
    vehicleBrand: null,
    vehicleModel: null
  },
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
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    setSynchronizeApiData(
      state: PersistState,
      action: PayloadAction<{
        vehicle?: Date | null;
        vehicleBrand?: Date | null;
        vehicleModel?: Date | null;
      }>
    ) {
      state.synchronizeApiData = {
        vehicle:
          action.payload.vehicle === undefined
            ? state.synchronizeApiData.vehicle
            : action.payload.vehicle,

        vehicleBrand:
          action.payload.vehicleBrand === undefined
            ? state.synchronizeApiData.vehicleBrand
            : action.payload.vehicleBrand,

        vehicleModel:
          action.payload.vehicleModel === undefined
            ? state.synchronizeApiData.vehicleModel
            : action.payload.vehicleModel
      };
    },
    setTheme(state: PersistState, action: PayloadAction<'dark' | 'light'>) {
      state.theme = action.payload;
    }
  }
});

export const {
  reducer: persistReducer,
  actions: { setAuth, logout, setTheme, setSynchronizeApiData }
} = persistSlice;

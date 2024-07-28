import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { netInfoReducer } from './net-info/slice';
import { persistReducer, persistStore } from 'redux-persist';
import { persistReducer as persistedReducer } from './persist/slice';
import { sidebarReducer } from './sidebar/slice';
import { useSelector } from 'react-redux';
import asyncStorage from '@react-native-async-storage/async-storage';
import type { TypedUseSelectorHook } from 'react-redux';

const persistConfig = {
  key: 'root',
  storage: asyncStorage
};

const persisted = persistReducer(persistConfig, persistedReducer);

const rootReducer = combineReducers({
  netInfo: netInfoReducer,
  persist: persisted,
  sidebar: sidebarReducer
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  reducer: rootReducer
});
export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

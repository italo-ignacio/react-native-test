import { store } from 'store';

export const hasConnection = (): boolean => {
  return store.getState().netInfo.hasInternetConnection;
};

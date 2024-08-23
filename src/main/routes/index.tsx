/* eslint-disable import/no-named-as-default-member */
import { AppRoutes } from './app.routes';
import { type FC, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PrivateRoutes } from './private.routes';
import { setInternetConnection } from 'store/net-info/slice';
import { useDispatch } from 'react-redux';
import { useToken } from 'data/hooks';
import NetInfo from '@react-native-community/netinfo';

export const Routes: FC = () => {
  const { isValid } = useToken();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setInternetConnection(state.isConnected ?? false));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <NavigationContainer>{isValid() ? <PrivateRoutes /> : <AppRoutes />}</NavigationContainer>;
};

import { type FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { SplashScreen } from 'presentation/environment';
import { Stack } from 'main/stack';
import { addEventListener } from '@react-native-community/netinfo';
import { paths } from 'main/config';
import { setInternetConnection } from 'store/net-info/slice';

export const PrivateRoutes: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = addEventListener((state) => {
      dispatch(setInternetConnection(state.isConnected ?? false));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName={paths.home} screenOptions={{ headerShown: false }}>
      <Stack.Screen component={SplashScreen} name={paths.home} />
    </Stack.Navigator>
  );
};

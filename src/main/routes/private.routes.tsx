import { type FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Ble } from 'presentation/environment/ble';
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
      <Stack.Screen component={Ble} name={paths.home} />
    </Stack.Navigator>
  );
};

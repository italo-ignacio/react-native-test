import { SplashScreen } from 'presentation/environment';
import { Stack } from 'main/stack';
import { paths } from 'main/config';
import type { FC } from 'react';

export const AppRoutes: FC = () => (
  <Stack.Navigator initialRouteName={paths.login} screenOptions={{ headerShown: false }}>
    <Stack.Screen component={SplashScreen} name={paths.login} />
  </Stack.Navigator>
);

import { Home } from 'presentation/environment';
import { Stack } from 'main/stack';
import { paths } from 'main/config';
import type { FC } from 'react';

export const HomeRoutes: FC = () => (
  <Stack.Navigator initialRouteName={paths.home} screenOptions={{ headerShown: false }}>
    <Stack.Screen component={Home} name={paths.home} />
  </Stack.Navigator>
);

import { Login, RecoverPassword, Register, UpdatePassword } from 'presentation/environment';
import { Stack } from 'main/stack';
import { paths } from 'main/config';
import type { FC } from 'react';

export const AppRoutes: FC = () => (
  <Stack.Navigator initialRouteName={paths.login} screenOptions={{ headerShown: false }}>
    <Stack.Screen component={Login} name={paths.login} />
    <Stack.Screen component={Register} name={paths.register} />
    <Stack.Screen component={RecoverPassword} name={paths.recoverPassword} />
    <Stack.Screen component={UpdatePassword} name={paths.updatePassword} />
  </Stack.Navigator>
);

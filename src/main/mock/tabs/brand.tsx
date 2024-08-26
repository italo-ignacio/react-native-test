import { Brand, BrandEdit, BrandRegister } from 'presentation/environment';
import { Stack } from 'main/stack';
import { paths } from 'main/config';
import type { FC } from 'react';

export const BrandRoutes: FC = () => (
  <Stack.Navigator initialRouteName={paths.brand} screenOptions={{ headerShown: false }}>
    <Stack.Screen component={Brand} name={paths.brand} />
    <Stack.Screen component={BrandRegister} name={paths.brandRegister} />
    <Stack.Screen component={BrandEdit} name={paths.brandEdit} />
  </Stack.Navigator>
);

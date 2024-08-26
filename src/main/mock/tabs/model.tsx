import { Model, ModelEdit, ModelRegister } from 'presentation/environment';
import { Stack } from 'main/stack';
import { paths } from 'main/config';
import type { FC } from 'react';

export const ModelRoutes: FC = () => (
  <Stack.Navigator initialRouteName={paths.model} screenOptions={{ headerShown: false }}>
    <Stack.Screen component={Model} name={paths.model} />
    <Stack.Screen component={ModelRegister} name={paths.modelRegister} />
    <Stack.Screen component={ModelEdit} name={paths.modelEdit} />
  </Stack.Navigator>
);

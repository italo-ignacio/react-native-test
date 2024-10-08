import { createStackNavigator } from '@react-navigation/stack';
import type { paths } from 'main/config/paths';

export type RootStackParamList = {
  [K in keyof typeof paths]: object | undefined;
};

export const Stack = createStackNavigator<RootStackParamList>();

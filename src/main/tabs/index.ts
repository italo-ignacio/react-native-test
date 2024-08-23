import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { paths } from 'main/config/paths';

export type RootTabsParamList = {
  [K in keyof typeof paths]: undefined;
};

export const Tab = createBottomTabNavigator<RootTabsParamList>();

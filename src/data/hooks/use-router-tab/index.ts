import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RootTabsParamList } from 'main/tabs';

export const useRouterTab = (): BottomTabNavigationProp<RootTabsParamList> => useNavigation();

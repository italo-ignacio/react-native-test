import { BrandRoutes } from './brand';
import { HomeRoutes } from './home';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ModelRoutes } from './model';
import { Profile } from 'presentation/environment';
import { VehicleRoutes } from './vehicle';
import { colors } from 'presentation/style';
import { paths } from 'main/config';
import type { ReactElement } from 'react';

export const tabsMock = [
  {
    component: HomeRoutes,
    name: paths.homeRoutes,
    onlyAdmin: false,
    tabBarIcon: ({ focused }: { focused: boolean }): ReactElement => (
      <Ionicons
        color={focused ? colors.primary : 'gray'}
        name={focused ? 'home' : 'home-outline'}
        size={20}
      />
    ),
    title: 'Home'
  },
  {
    component: VehicleRoutes,
    name: paths.vehicleRoutes,
    onlyAdmin: false,
    tabBarIcon: ({ focused }: { focused: boolean }): ReactElement => (
      <Ionicons
        color={focused ? colors.primary : 'gray'}
        name={focused ? 'car' : 'car-outline'}
        size={24}
      />
    ),
    title: 'Veiculos'
  },
  {
    component: BrandRoutes,
    name: paths.brandRoutes,
    onlyAdmin: true,
    tabBarIcon: ({ focused }: { focused: boolean }): ReactElement => (
      <MaterialCommunityIcons
        color={focused ? colors.primary : 'gray'}
        name={focused ? 'car-cog' : 'car-cog'}
        size={24}
      />
    ),
    title: 'Marcas'
  },
  {
    component: ModelRoutes,
    name: paths.modelRoutes,
    onlyAdmin: true,
    tabBarIcon: ({ focused }: { focused: boolean }): ReactElement => (
      <MaterialCommunityIcons
        color={focused ? colors.primary : 'gray'}
        name={focused ? 'car-side' : 'car-side'}
        size={24}
      />
    ),
    title: 'Modelos'
  },
  {
    component: Profile,
    name: paths.profile,
    onlyAdmin: false,
    tabBarIcon: ({ focused }: { focused: boolean }): ReactElement => (
      <Ionicons
        color={focused ? colors.primary : 'gray'}
        name={focused ? 'person' : 'person-outline'}
        size={20}
      />
    ),
    title: 'Perfil'
  }
];

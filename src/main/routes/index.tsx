import { AppRoutes } from './app.routes';
import { NavigationContainer } from '@react-navigation/native';
import { PrivateRoutes } from './private.routes';
import { useToken } from 'data/hooks';
import type { FC } from 'react';

export const Routes: FC = () => {
  const { isValid } = useToken();

  return <NavigationContainer>{isValid() ? <PrivateRoutes /> : <AppRoutes />}</NavigationContainer>;
};

import { AppRoutes } from './app.routes';
import { NavigationContainer } from '@react-navigation/native';
import { PrivateRoutes } from './private.routes';
import { tokenIsExpired } from 'main/utils';
import type { FC } from 'react';

export const Routes: FC = () => {
  return (
    <NavigationContainer>
      {tokenIsExpired() ? <AppRoutes /> : <PrivateRoutes />}
    </NavigationContainer>
  );
};

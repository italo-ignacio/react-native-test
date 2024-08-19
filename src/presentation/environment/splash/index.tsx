import { ImageBackground } from 'react-native';
import { SplashBackground } from 'assets';
import { colors } from 'presentation/style';
import type { FC } from 'react';

export const SplashScreen: FC = () => {
  return (
    <ImageBackground
      source={SplashBackground}
      style={{
        alignItems: 'center',
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'center'
      }}
    />
  );
};

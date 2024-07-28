import { Text, TouchableOpacity, View } from 'react-native';
import type { FC } from 'react';

export const SplashScreen: FC = () => {
  return (
    <View className={'flex min-h-screen justify-center items-center bg-primary'}>
      <Text className={''}>sasa</Text>

      <TouchableOpacity activeOpacity={0.5}>
        <Text>Scan Bluetooth Devices </Text>
      </TouchableOpacity>
    </View>
  );
};

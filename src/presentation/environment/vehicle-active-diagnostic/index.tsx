import { Button } from 'presentation/atomic-component/atom';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { Text, View } from 'react-native';
import { TranslatedCharacteristic } from 'domain/enums';
import { gap } from 'main/utils';
import { useBluetooth } from 'data/hooks';
import type { CharacteristicType } from 'domain/enums';
import type { FC } from 'react';

export const VehicleActiveDiagnostic: FC = () => {
  const { data, isMonitoring, startMonitor, stopMonitor } = useBluetooth();

  return (
    <PrivateContainer headerTitle={'Diagnostic Veículos'}>
      <Button
        onPress={isMonitoring ? stopMonitor : startMonitor}
        text={isMonitoring ? 'Monitorando ...' : 'Not'}
      />

      <View className={'flex flex-row flex-wrap ml-1.5 '} {...gap(20)}>
        {Object.keys(data)?.map((key) => {
          const code = key as CharacteristicType;

          return (
            <View
              key={code}
              {...gap(12)}
              className={'justify-between bg-blue-mid rounded-md w-[45%] p-3'}
            >
              <Text className={'text-center'}>{TranslatedCharacteristic[code]}</Text>

              <Text className={'text-center font-bold'}>
                {String(typeof data[code] === 'object' ? JSON.stringify(data[code]) : data[code])}
              </Text>
            </View>
          );
        })}
      </View>
    </PrivateContainer>
  );
};

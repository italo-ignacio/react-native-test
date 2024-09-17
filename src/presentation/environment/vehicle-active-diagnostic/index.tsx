import { Button, Speedometer } from 'presentation/atomic-component/atom';
import { CharacteristicType, TranslatedCharacteristic } from 'domain/enums';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { Text, View } from 'react-native';
import { gap } from 'main/utils';
import { useBluetooth } from 'data/hooks';
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
        <View {...gap(4)} className={'justify-between bg-blue-mid rounded-md w-[45%] p-3'}>
          <Text className={'text-center'}>
            {TranslatedCharacteristic[CharacteristicType.engineSpeed]}
          </Text>

          <Speedometer
            maxValue={9000}
            unit={'RPM'}
            value={Number(
              typeof data[CharacteristicType.engineSpeed] === 'object'
                ? 0
                : data[CharacteristicType.engineSpeed] ?? 0
            )}
          />
        </View>

        <View {...gap(4)} className={'justify-between bg-blue-mid rounded-md w-[45%] p-3'}>
          <Text className={'text-center'}>
            {TranslatedCharacteristic[CharacteristicType.vehicleSpeed]}
          </Text>

          <Speedometer
            maxValue={320}
            unit={'km/h'}
            value={Number(
              typeof data[CharacteristicType.vehicleSpeed] === 'object'
                ? 0
                : data[CharacteristicType.vehicleSpeed] ?? 0
            )}
          />
        </View>

        {Object.keys(data)?.map((key) => {
          const code = key as CharacteristicType;

          if (code === CharacteristicType.engineSpeed || code === CharacteristicType.vehicleSpeed)
            return null;

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

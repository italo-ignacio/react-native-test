import { Button } from 'presentation/atomic-component/atom';
import { CharacteristicType, TranslatedCharacteristic } from 'domain/enums';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { Text, View } from 'react-native';
import { colors } from 'presentation/style';
import { gap } from 'main/utils';
import { useBluetooth } from 'data/hooks';
import Speedometer, {
  Arc,
  Background,
  DangerPath,
  Indicator,
  Marks,
  Needle,
  Progress
} from 'data/speedometer';
import type { FC } from 'react';

export const VehicleActiveDiagnostic: FC = () => {
  const { data, isMonitoring, startMonitor, stopMonitor } = useBluetooth();

  const getX = (value: number | object | string | undefined): number => {
    if (typeof value === 'object' || typeof value === 'undefined' || value === 'undefined')
      return 30;

    switch (String(value).length) {
      case 1:
        return 30;
      case 2:
        return 30;
      case 3:
        return 25;
      case 4:
        return 20;
      case 5:
        return 15;
      default:
        return 0;
    }
  };

  const getValue = (value: number | object | string | undefined): number => {
    return Number(typeof value === 'object' ? 0 : value ?? 0);
  };

  return (
    <PrivateContainer headerTitle={'Diagnostic Veículos'}>
      <Button
        onPress={isMonitoring ? stopMonitor : startMonitor}
        text={isMonitoring ? 'Monitorando ...' : 'Monitorar'}
      />

      <View className={'flex flex-row flex-wrap'} {...gap(4)}>
        <View {...gap(4)} className={'justify-between bg-blue-mid rounded-md w-[49%] items-center'}>
          <Text className={'text-center p-3'}>
            {TranslatedCharacteristic[CharacteristicType.vehicleSpeed]}
          </Text>

          <Speedometer
            angle={170}
            height={130}
            max={300}
            value={getValue(data[CharacteristicType.vehicleSpeed])}
            width={145}
          >
            <Background angle={180} color={'gray'} />
            <Arc color={'black'} />
            <Needle circleColor={colors.primary} color={'#4555e9'} />
            <Progress color={'blue'} />
            <Marks fontSize={10} lineColor={'black'} step={25} textColor={'black'} />

            <Indicator
              endText={'km/h'}
              fill={'#555'}
              fixValue
              fontFamily={'squada-one'}
              fontSize={24}
              x={getX(data[CharacteristicType.vehicleSpeed])}
              y={120}
            />
          </Speedometer>
        </View>

        <View {...gap(4)} className={'justify-between bg-blue-mid rounded-md w-[49%] items-center'}>
          <Text className={'text-center p-3'}>
            {TranslatedCharacteristic[CharacteristicType.engineSpeed]}
          </Text>

          <Speedometer
            angle={170}
            height={130}
            max={10000}
            value={getValue(data[CharacteristicType.engineSpeed])}
            width={145}
          >
            <Background angle={180} color={'gray'} />
            <Arc color={'black'} />
            <Needle circleColor={colors.primary} color={'#4555e9'} />
            <Progress color={'blue'} />

            <Marks
              divider={1000}
              fontSize={10}
              lineColor={'black'}
              step={1000}
              textColor={'black'}
            />

            <DangerPath />

            <Indicator
              endText={'RPM'}
              fill={'#555'}
              fixValue
              fontFamily={'squada-one'}
              fontSize={24}
              x={getX(data[CharacteristicType.engineSpeed])}
              y={120}
            />
          </Speedometer>
        </View>
      </View>

      <View className={'flex flex-row flex-wrap ml-1.5 '} {...gap(20)}>
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

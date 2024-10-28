import { Button, ScrollView, Text, View } from 'react-native';
import { CharacteristicType, TranslatedCharacteristic } from 'domain/enums';
import { PrivateContainer } from 'presentation/atomic-component/template';
import { colors } from 'presentation/style';
import { convertOBDResponseToVIN, gap } from 'main/utils';
import { useAppSelector } from 'store';
import { useBluetooth, useDatabase } from 'data/hooks';
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

export const Home: FC = () => {
  const { user } = useAppSelector((state) => state.persist);
  const database = useDatabase();
  const { startMonitor, stopMonitor, isMonitoring } = useBluetooth();

  return (
    <PrivateContainer headerSubtitle={`${user?.firstName} ${user?.firstName}`} headerTitle={'Olá,'}>
      <ScrollView>
        <View className={'flex flex-row flex-wrap'} {...gap(4)}>
          <View
            {...gap(4)}
            className={'justify-between bg-blue-mid rounded-md w-[49%] items-center'}
          >
            <Text className={'text-center p-3'}>
              {TranslatedCharacteristic[CharacteristicType.vehicleSpeed]}
            </Text>

            <Speedometer angle={160} height={130} max={300} value={200} width={150}>
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
                x={20}
                y={120}
              />
            </Speedometer>
          </View>

          <View
            {...gap(4)}
            className={'justify-between bg-blue-mid rounded-md w-[49%] items-center'}
          >
            <Text className={'text-center p-3'}>
              {TranslatedCharacteristic[CharacteristicType.engineSpeed]}
            </Text>

            <Speedometer angle={160} height={130} max={10000} value={2500} width={150}>
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
                x={20}
                y={120}
              />
            </Speedometer>
          </View>
        </View>

        <View className={'mt-4'} />

        <Button
          onPress={async (): Promise<void> => {
            const offlineQueue = await database.totalElements('offline_queue');

            console.info('offlineQueue', offlineQueue);

            const obdData = await database.totalElements('obd_data');

            console.info('obdData', obdData);

            const obdDataAverage = await database.totalElements('obd_data_average');

            console.info('obdDataAverage', obdDataAverage);

            const vehicleBrands = await database.totalElements('vehicle_brands');

            console.info('vehicleBrands', vehicleBrands);

            const vehicleModels = await database.totalElements('vehicle_models');

            console.info('vehicleModels', vehicleModels);
          }}
          title={'Find'}
        />

        <View className={'mt-4'} />

        <Button
          onPress={isMonitoring ? stopMonitor : startMonitor}
          title={isMonitoring ? 'Monitorando ...' : 'Not'}
        />

        <View className={'mt-4'} />

        <Button
          onPress={(): void => {
            const test = { line1: '35 2D 31 34 43 32', line2: '34 2D 45 44 42 00', line3: false };

            // {"line1": "5A 42 35 35 58 39", "line2": "38 38 35 32 39 33", "line3": false}
            // {"line1": "35 2D 31 34 43 32", "line2": "34 2D 45 44 42 00", "line3": false}

            console.log(convertOBDResponseToVIN(test));
          }}
          title={'aaaaaaaaaa'}
        />
      </ScrollView>
    </PrivateContainer>
  );
};

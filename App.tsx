/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { NativeBaseProvider } from 'native-base';
import 'expo-dev-client';
import { PermissionsAndroid, SafeAreaView } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Routes } from 'main/routes';
import { SplashScreen } from 'presentation/environment';
import { fontsToImport } from 'presentation/style/fonts';

// import { makeSQLiteDatabaseClientFactory } from 'main/factories/db';
import { persister, store } from 'store';
import { useFonts } from '@expo-google-fonts/roboto';
import { useState } from 'react';
import type { FC } from 'react';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        buttonNegative: 'Cancel',
        buttonNeutral: 'Ask Me Later',
        buttonPositive: 'OK',
        message: 'Grant location permission to allow the app to scan for Bluetooth devices',
        title: 'Location permission for bluetooth scanning'
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED)
      console.log('Location permission for bluetooth scanning granted');
    else console.log('Location permission for bluetooth scanning denied');
  } catch (err) {
    console.warn(err);
  }
}

requestLocationPermission();

const App: FC = () => {
  const [fontsLoaded] = useFonts(fontsToImport);
  const [isLoading, setIsLoading] = useState(true);

  /*
   * useEffect(() => {
   *   makeSQLiteDatabaseClientFactory().initDatabase();
   * }, []);
   */

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  /*
   * const [manager, setManager] = useState<BleManager | null>(null);
   * const [isScanning, setIsScanning] = useState(false);
   */

  /*
   * useEffect(() => {
   *   const bleManager = new BleManager();
   */

  //   setManager(bleManager);

  /*
   *   return () => {
   *     bleManager.destroy();
   *   };
   * }, []);
   */

  /*
   * const requestPermission = async () => {
   *   await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
   *   await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
   *   await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE);
   *   await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
   *   await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
   */

  /*
   *   // startScanning()
   * };
   */

  /*
   * const startScan = () => {
   *   console.log('dsds');
   *   const bleManager = new BleManager();
   */

  /*
   *   if (manager) {
   *     setIsScanning(true);
   *     manager.startDeviceScan(null, null, (error, device) => {
   *       if (error) {
   *         console.log(error);
   *         setIsScanning(false);
   *         return;
   *       }
   */

  //       console.log('Dispositivo encontrado: ', device.name);

  /*
   *       // Aqui você pode parar o escaneamento ou conectar ao dispositivo
   *     });
   *   }
   * };
   */

  /*
   * const stopScan = () => {
   *   console.log('dsds');
   *   const bleManager = new BleManager();
   */

  /*
   *   setManager(bleManager);
   *   if (manager) {
   *     manager.stopDeviceScan();
   *     setIsScanning(false);
   *   }
   * };
   */

  /*
   * useEffect(() => {
   *   BleManager.enableBluetooth().then(() => {
   *     console.log('Bluetooth is turned on!');
   *   });
   */

  /*
   *   if (Platform.OS === 'android' && Platform.Version >= 23)
   *     PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(
   *       (result) => {
   *         if (result) console.log('Permission is OK');
   *         else
   *           PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(
   *             (result) => {
   *               if (result) console.log('User accept');
   *               else console.log('User refuse');
   *             }
   *           );
   *       }
   *     );
   * }, []);
   */

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        {/* <NativeBaseProvider theme={theme}> */}
        <SafeAreaView style={{ flex: 1 }}>
          {/* <View className={'h-screen flex items-center justify-center '}>
            <Button color={'red'} onPress={requestPermission} title={'Permissao'} />

            <Button
              color={'red'}
              onPress={startScan}
              title={isScanning ? 'Parar Escaneamento' : 'Iniciar Escaneamento'}
            />
          </View> */}

          {!isLoading && fontsLoaded ? <Routes /> : <SplashScreen />}
        </SafeAreaView>

        {/* </NativeBaseProvider> */}
      </PersistGate>
    </Provider>
  );
};

export default App;

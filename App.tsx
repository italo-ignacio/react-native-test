/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { NativeBaseProvider } from 'native-base';
import 'expo-dev-client';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { PermissionsAndroid, SafeAreaView, StatusBar } from 'react-native';
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

    await requestMultiple([
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    ]);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          {/* <NativeBaseProvider theme={theme}> */}
          {!isLoading && fontsLoaded ? <Routes /> : <SplashScreen />}

          {/* </NativeBaseProvider> */}
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;

// import { NativeBaseProvider } from 'native-base';
import { BleManager } from 'react-native-ble-plx';
import { Button, SafeAreaView } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Routes } from 'main/routes';
import { SplashScreen } from 'presentation/environment';
import { fontsToImport } from 'presentation/style/fonts';

// import { makeSQLiteDatabaseClientFactory } from 'main/factories/db';
import { persister, store } from 'store';
import { useEffect, useState } from 'react';
import { useFonts } from '@expo-google-fonts/roboto';
import type { FC } from 'react';

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

  const [manager, setManager] = useState<BleManager | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const bleManager = new BleManager();

    setManager(bleManager);

    return () => {
      bleManager.destroy();
    };
  }, []);

  const startScan = () => {
    if (manager) {
      setIsScanning(true);
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log(error);
          setIsScanning(false);
          return;
        }

        console.log('Dispositivo encontrado: ', device.name);

        // Aqui você pode parar o escaneamento ou conectar ao dispositivo
      });
    }
  };

  const stopScan = () => {
    if (manager) {
      manager.stopDeviceScan();
      setIsScanning(false);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        {/* <NativeBaseProvider theme={theme}> */}
        <SafeAreaView style={{ flex: 1 }}>
          <Button
            onPress={isScanning ? stopScan : startScan}
            title={isScanning ? 'Parar Escaneamento' : 'Iniciar Escaneamento'}
          />

          {!isLoading && fontsLoaded ? <Routes /> : <SplashScreen />}
        </SafeAreaView>

        {/* </NativeBaseProvider> */}
      </PersistGate>
    </Provider>
  );
};

export default App;

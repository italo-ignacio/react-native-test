// import { NativeBaseProvider } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Routes } from 'main/routes';
import { SafeAreaView } from 'react-native';
import { SplashScreen } from 'presentation/environment';
import { fontsToImport } from 'presentation/style/fonts';

// import { makeSQLiteDatabaseClientFactory } from 'main/factories/db';
import { persister, store } from 'store';
import { useFonts } from '@expo-google-fonts/roboto';
import { useState } from 'react';
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

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        {/* <NativeBaseProvider theme={theme}> */}
        <SafeAreaView style={{ flex: 1 }}>
          {!isLoading && fontsLoaded ? <Routes /> : <SplashScreen />}
        </SafeAreaView>

        {/* </NativeBaseProvider> */}
      </PersistGate>
    </Provider>
  );
};

export default App;

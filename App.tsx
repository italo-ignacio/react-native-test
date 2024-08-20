import 'expo-dev-client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Routes } from 'main/routes';
import { SQLiteProvider } from 'expo-sqlite';
import { SafeAreaView, StatusBar } from 'react-native';
import { SplashScreen } from 'presentation/environment';
import { fontsToImport } from 'presentation/style/fonts';
import { initializeDatabase } from 'infra/db';
import { persister, store } from 'store';
import { useFonts } from '@expo-google-fonts/roboto';
import { useState } from 'react';
import type { FC } from 'react';

const App: FC = () => {
  const [fontsLoaded] = useFonts(fontsToImport);
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  return (
    <SQLiteProvider databaseName={'database.db'} onInit={initializeDatabase}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />

        <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
            {!isLoading && fontsLoaded ? <Routes /> : <SplashScreen />}
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SQLiteProvider>
  );
};

export default App;

import 'expo-dev-client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { Routes } from 'main/routes';
import { SQLiteProvider } from 'expo-sqlite';
import { SafeAreaView, StatusBar } from 'react-native';
import { SplashScreen } from 'presentation/environment';
import { fontsToImport } from 'presentation/style/fonts';
import { initializeDatabase } from 'infra/db';
import { persister, store } from 'store';
import { queryClient } from 'infra/lib';
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
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar />

          <Provider store={store}>
            <PersistGate loading={null} persistor={persister}>
              {!isLoading && fontsLoaded ? <Routes /> : <SplashScreen />}
            </PersistGate>
          </Provider>
        </SafeAreaView>
      </QueryClientProvider>
    </SQLiteProvider>
  );
};

export default App;

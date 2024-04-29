import React from 'react';
import {useColorScheme} from 'react-native';
import Navigation from './src/view/navigation';
import {QueryClient} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 0,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

function App(): React.JSX.Element {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: asyncStoragePersister}}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </PersistQueryClientProvider>
  );
}

export default App;

import React from 'react';
import {useColorScheme} from 'react-native';
import Navigation from './src/view/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;

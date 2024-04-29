import {render} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactElement, ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: false}},
});

const AllTheProviders = ({children}: {children: ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>{children}</NavigationContainer>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options: any) =>
  render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};

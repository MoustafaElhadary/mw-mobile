import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useFonts } from 'expo-font';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import Routes from './navigation/index';
import store from './redux/store';
import axios from 'axios';
import Constants from 'expo-constants';

// const defaultQueryFn = async ({ queryKey }) => {
//   const { data } = await axios.get(`${Constants.manifest.extra.apiUrl}${queryKey}`);
//   return data;
// };
const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     queryFn: defaultQueryFn,
  //   },
  // },
});

const App = () => {
  const [loaded] = useFonts({
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    Ageo: require('./assets/fonts/Ageo-SemiBold.otf'),
    'Ageo-Bold': require('./assets/fonts/Ageo-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" translucent={false} />
          <Provider store={store}>
            <Routes />
          </Provider>
        </SafeAreaProvider>
      </ApplicationProvider>
    </QueryClientProvider>
  );
};

export default App;

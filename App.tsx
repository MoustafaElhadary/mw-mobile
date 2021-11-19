import { useFonts } from 'expo-font';
import React from 'react';
import { Provider } from 'react-redux';
import Routes from './navigation/index';
import store from './redux/store';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'react-native';

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
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" translucent={false} />
        <Provider store={store}>
          <Routes />
        </Provider>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
};

export default App;

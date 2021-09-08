import React, { useContext, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import Routes from './navigation/index';

import store from './redux/store';
import { View } from 'react-native';

const App = () => {
  const [loaded] = useFonts({
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  console.log('hello');
  if (!loaded) {
    return null;
  }
  console.log('world');

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;

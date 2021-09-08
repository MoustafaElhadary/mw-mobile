import { AuthenticatedUserProvider } from './AuthenticatedUserProvider';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

import Firebase from '../utils/firebase';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import { createStackNavigator } from '@react-navigation/stack';
import { OnBoarding, SignIn, SignUp, ForgotPassword, Otp } from '../screens';
import CustomDrawer from './CustomDrawer';

export default function Routes() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
const Stack = createStackNavigator();

function RootNavigator() {
  const auth = Firebase.auth();

  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(
      async (authenticatedUser) => {
        try {
          await (authenticatedUser
            ? setUser(authenticatedUser)
            : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  console.log({ user, auth });
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={CustomDrawer} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="OnBoarding" component={OnBoarding} />

      <Stack.Screen name="SignIn" component={SignIn} />

      <Stack.Screen name="SignUp" component={SignUp} />

      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      <Stack.Screen name="Otp" component={Otp} />
    </Stack.Navigator>
  );
}

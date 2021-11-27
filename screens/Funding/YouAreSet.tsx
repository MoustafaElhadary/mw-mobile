import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setSelectedTab } from '../../redux/tabSlice';
import { constants, images } from '../../utils/constants';

const YouAreSet = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
        backgroundColor: '#F8F8F7',
      }}
    >
      {/* Title */}

      <View
        style={{
          marginTop: '8%',
          paddingVertical: 16,
          backgroundColor: '#F8F8F7',
          flexDirection: 'column',
          paddingLeft: 16,
          paddingRight: 48,
        }}
      >
        <Text style={styles.header}>You're all set!</Text>
        <Text style={styles.subtitle}>
          Thanks! We’ve received your request. We’ll start transferring your
          deposit 1-2 days from the date you requested.
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Image
          source={images.money_rain}
          resizeMode="contain"
          style={{
            height: 500,
            width: '100%',
          }}
        />
      </View>
      <ConfettiCannon count={400} origin={{ x: -10, y: 0 }} />

      <View
        style={{
          width: '100%',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#068466',
            borderRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginTop: 40,
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={() => {
            dispatch(setSelectedTab(constants.screens.home));
            navigation.navigate('Home');
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontFamily: 'PublicSans-SemiBold',
              fontSize: 18,
              fontStyle: 'normal',
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default YouAreSet;

const styles = StyleSheet.create({
  header: {
    color: '#234236',
    fontFamily: 'Ageo',
    fontSize: 30,
    lineHeight: 40,
  },
  subtitle: {
    color: '#8C9F97',
    fontFamily: 'PublicSans-SemiBold',
    fontSize: 12,
    lineHeight: 16,
    paddingTop: 18,
  },
});

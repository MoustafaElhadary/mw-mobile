import React from 'react';
import { Image, Text, View, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS, FONTS, images, SIZES } from '../../utils/constants';

export type authLayoutProps = {
  title: string;
  subtitle?: string;
  titleContainerStyle?: ViewStyle;
  children?: JSX.Element | JSX.Element[];
};
const AuthLayout = ({
  title,
  subtitle,
  titleContainerStyle,
  children,
}: authLayoutProps) => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: SIZES.height > 800 ? SIZES.padding : SIZES.radius,
        backgroundColor: COLORS.white,
      }}
    >
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* App Logo */}
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Image
            source={images.logo_02}
            resizeMode="contain"
            style={{
              height: 100,
              width: 200,
            }}
          />
        </View>

        {/* Title */}
        <View
          style={{
            marginTop: SIZES.height > 800 ? SIZES.padding : 0,
            ...titleContainerStyle,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.h2,
            }}
          >
            {title}
          </Text>

          {subtitle && (
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.darkGray,
                marginTop: SIZES.base,
                ...FONTS.body3,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AuthLayout;

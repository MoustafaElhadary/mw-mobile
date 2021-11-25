import React from 'react';
import { Image, View, ViewStyle } from 'react-native';
import { images } from '../utils/constants';

export type HeaderProps = {
  containerStyle: ViewStyle;
  title: string;
  titleStyle?: ViewStyle;
  leftComponent: JSX.Element;
  rightComponent?: JSX.Element;
};
const Header = ({
  containerStyle,
  title,
  titleStyle,
  leftComponent,
  rightComponent,
}: HeaderProps): JSX.Element => {
  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        ...containerStyle,
      }}
    >
      {leftComponent}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* {title === 'HOME' ? (
          <Image
            source={images.logo_01}
            resizeMode="contain"
            style={{
              height: 40,
              width: 40,
            }}
          />
        ) : (
          <Text style={{ ...FONTS.h3, ...titleStyle }}>{title}</Text>
        )} */}
        <Image
          source={images.logo_01}
          resizeMode="contain"
          style={{
            height: 40,
            width: 40,
          }}
        />
      </View>
      {rightComponent}
    </View>
  );
};

export default Header;

import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { FONTS } from '../utils/constants';

export type HeaderProps = {
  containerStyle: ViewStyle;
  title: string;
  titleStyle?: ViewStyle;
  leftComponent: JSX.Element;
  rightComponent: JSX.Element;
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
        <Text style={{ ...FONTS.h3, ...titleStyle }}>{title}</Text>
      </View>
      {rightComponent}
    </View>
  );
};

export default Header;

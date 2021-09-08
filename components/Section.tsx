import { SIZES, FONTS, COLORS } from '../utils/constants';
import React from 'react';
import { ViewStyle, View, TouchableOpacity, Text } from 'react-native';

type SectionProps = {
  title: string;
  containerStyle?: ViewStyle;
  children?: JSX.Element | JSX.Element[];
};

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>

        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
            Show All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {children}
    </View>
  );
};

export default Section;

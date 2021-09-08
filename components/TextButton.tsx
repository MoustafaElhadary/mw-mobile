import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  GestureResponderEvent,
  TextStyle,
} from 'react-native';
import { FONTS, COLORS } from '../constants';

export type TextButtonProps = {
  label: string;
  labelStyle?: TextStyle;
  buttonContainerStyle?: ViewStyle;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

const TextButton = ({
  label,
  labelStyle,
  buttonContainerStyle,
  onPress,
  disabled = false,
}: TextButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        ...buttonContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={{ color: COLORS.white, ...FONTS.h3, ...labelStyle }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;

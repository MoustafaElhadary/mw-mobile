import React from 'react';
import {
  View,
  Text,
  TextInput,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';

import { FONTS, SIZES, COLORS } from '../constants';

export type FormInputType = {
  containerStyle: ViewStyle;
  label: string;
  placeholder: string;
  inputStyle: ViewStyle;
  prependComponent: JSX.Element;
  appendComponent: JSX.Element;
  onChange: (text: string) => void;
  secureTextEntry: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCompleteType?:
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'name'
    | 'password'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'username'
    | 'off';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  errorMsg?: string;
};

const FormInput = ({
  containerStyle,
  label,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  errorMsg = '',
}: FormInputType) => {
  return (
    <View style={{ ...containerStyle }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>{label}</Text>
        <Text style={{ color: COLORS.red, ...FONTS.body4 }}>{errorMsg}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          height: SIZES.height > 800 ? 55 : 45,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.height > 800 ? SIZES.base : 0,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        {prependComponent}
        <TextInput
          style={{ flex: 1, ...inputStyle }}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          onChangeText={(text) => onChange(text)}
        />
        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;

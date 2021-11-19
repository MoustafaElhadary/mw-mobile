import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { commonStyles } from '../../utils/constants/theme';

interface SignUpTextInputProps {
    placeholder: TextInputProps['placeholder'];
    autoCorrect?: TextInputProps['autoCorrect'];
    autoCompleteType?: TextInputProps['autoCompleteType'];
    autoCapitalize?: TextInputProps['autoCapitalize'];
    secureTextEntry?: TextInputProps['secureTextEntry'];
    onChangeText: (val: string) => void;
    value: TextInputProps['value'];
    invalid: boolean;
}

const SignUpTextInput = ({
    placeholder = '',
    autoCorrect = false,
    autoCompleteType = 'off',
    autoCapitalize = 'none',
    secureTextEntry = false,
    value,
    onChangeText,
    invalid,
}: SignUpTextInputProps): JSX.Element => {
    const [inputFocused, setInputFocused] = React.useState<boolean>(false);
    const secondaryInputStyle = invalid
        ? commonStyles.textInputInvalid
        : inputFocused
        ? commonStyles.textInputFocused
        : {};
    return (
        <TextInput
            placeholder={placeholder}
            autoCompleteType={autoCompleteType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            value={value}
            style={[commonStyles.textInput, secondaryInputStyle]}
            onFocus={(): void => setInputFocused(true)}
            onBlur={(): void => setInputFocused(false)}
        />
    );
};

export default SignUpTextInput;

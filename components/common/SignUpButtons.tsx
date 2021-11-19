import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '@ui-kitten/components';
import { commonStyles } from '../../utils/constants/theme';

interface ContinueButtonProps {
    onPress: () => void;
    disabled?: boolean;
    text?: string;
}

export const ContinueButton = ({ onPress, disabled = false, text = 'Continue' }: ContinueButtonProps): JSX.Element => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={!disabled ? commonStyles.continueButton : commonStyles.continueButtonDisabled}
            disabled={disabled}>
            <Text style={commonStyles.continueButtonText}>{text}</Text>
        </TouchableOpacity>
    );
};

interface BackButtonProps {
    onPress: () => void;
    text?: string;
}

export const BackButton = ({ onPress, text = 'Back' }: BackButtonProps): JSX.Element => {
    return (
        <TouchableOpacity onPress={onPress} style={commonStyles.backButton}>
            <Text style={commonStyles.backButtonText}>{text}</Text>
        </TouchableOpacity>
    );
};

import React from 'react';
import {
    GestureResponderEvent,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { images } from '../../utils/constants';

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

export const BackButton = ({ onPress }: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
      <Image source={images.back} style={styles.backButtonImage} />
    </TouchableOpacity>
  );
};

export const CloseButton = ({ onPress }: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.closeButton}>
      <Image source={images.close} style={styles.closeButtonImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButtonText: {
    color: 'black',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  backButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 9,
    height: 19,
    marginTop: 54,
    padding: 20,
  },
  backButtonImage: {
    resizeMode: 'contain',
  },
  closeButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: 2,
    height: 2,
    marginRight: 22,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  closeButtonImage: {
    resizeMode: 'contain',
  },
  closeButtonText: {
    color: 'black',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
});

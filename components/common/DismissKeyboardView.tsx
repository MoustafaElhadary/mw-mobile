import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet, TouchableWithoutFeedback, View
} from 'react-native';

interface DismissKeyboardProps {
  children?: JSX.Element[] | JSX.Element;
  style?: object;
  pad?: boolean;
}

const DismissKeyboardView = ({
  children,
  style,
  pad = false,
}: DismissKeyboardProps): JSX.Element => {
  const [keyboardShown, setKeyboardShown] = React.useState<boolean>(false);
  React.useEffect(() => {
    const showListener = Keyboard.addListener('keyboardWillShow', () =>
      setKeyboardShown(true)
    );
    const hideListener = Keyboard.addListener('keyboardWillHide', () =>
      setKeyboardShown(false)
    );

    return (): void => {
      showListener.remove();
      hideListener.remove();
    };
  }, [setKeyboardShown]);

  return (
    <TouchableWithoutFeedback
      style={style}
      onPress={(): void => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.KeyboardAvoidingView}
        enabled
      >
        <View
          style={
            keyboardShown && pad ? styles.ContentViewPadded : styles.ContentView
          }
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboardView;

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    width: '100%',
    flex: 1,
  },
  ContentView: {
    flex: 1,
    width: '100%',
  },
  ContentViewPadded: {
    flex: 1,
    width: '100%',
    paddingBottom: 20,
  },
});

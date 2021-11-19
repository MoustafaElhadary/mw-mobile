import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DismissKeyboardView from '../../components/common/DismissKeyboardView';
import { CheckmarkIcon } from '../../components/common/icons';
import { ContinueButton } from '../../components/common/SignUpButtons';
import { commonStyles } from '../../utils/constants/theme';

interface GetYouSetupProps {
  navigation?: StackNavigationProp<any>;
}

const GetYouSetup = ({ navigation }: GetYouSetupProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        commonStyles.flex,
        { paddingBottom: insets.bottom, paddingTop: insets.top },
      ]}
    >
      <DismissKeyboardView style={commonStyles.flex} pad>
        <View style={commonStyles.flex}>
          <View style={styles.TopBarView}>
            {/* <BackButton onPress={prevPage} />
                <CloseButton onPress={cancelSignUp} /> */}
          </View>
          <View style={styles.ContentView}>
            {/* {renderCurrentPage()} */}

            <>
              <Text style={commonStyles.titleText}>Let's get you set up!</Text>
              <Text
                style={{
                  ...commonStyles.subTitleText,
                  marginTop: 15,
                  marginBottom: 15,
                }}
              >
                We'll ask for some information so we can verify your identity
                and ensure your account is secure
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  paddingHorizontal: 21,
                }}
              >
                <CheckmarkIcon width="24" height="24" fill="rgb(35, 66, 54)" />
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text
                    style={{
                      ...commonStyles.h1Text,
                    }}
                  >
                    Your personal information
                  </Text>
                  <Text
                    style={{
                      ...commonStyles.subTitleText,
                      paddingRight: 50,
                      marginRight: 50,
                      marginVertical: 10,
                    }}
                  >
                    {' '}
                    Your full name, DOB, and residential address.
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  paddingHorizontal: 21,
                }}
              >
                <CheckmarkIcon width="24" height="24" fill="rgb(35, 66, 54)" />
                <View
                  style={{
                    flexDirection: 'column',
                    flexShrink: 1,
                  }}
                >
                  <Text
                    style={{
                      ...commonStyles.h1Text,
                    }}
                  >
                    Your Social Security Number (SSN)
                  </Text>
                  <Text
                    style={{
                      ...commonStyles.subTitleText,
                      paddingRight: 50,
                      marginRight: 50,
                      marginTop: 10,
                    }}
                  >
                    We're required to collect this to verify your identity and
                    comply with anti money laundering regulations.
                  </Text>
                </View>
              </View>
              <View style={commonStyles.flex} />
              <View style={commonStyles.buttonView}>
                <ContinueButton text="Get Started" onPress={() => {}} />
              </View>
            </>
          </View>
        </View>
      </DismissKeyboardView>
    </View>
  );
};

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: 'rgb(248, 248, 247)',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  TopBarView: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ContentView: {
    flex: 1,
    alignItems: 'flex-start',
  },
});

export default GetYouSetup;

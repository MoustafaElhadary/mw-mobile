import CustomSwitch from '../../components/CustomSwitch';
import FormInput from '../../components/FormInput';
import TextButton from '../../components/TextButton';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { utils } from '../../utils';
import { COLORS, FONTS, icons, SIZES } from '../../utils/constants';
import Firebase from '../../utils/firebase';
import AuthLayout from './AuthLayout';

const auth = Firebase.auth();

const SignIn = ({ navigation }) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string>('');

  const [showPass, setShowPass] = React.useState(false);
  const [saveMe, setSaveMe] = React.useState(false);

  const [errorMsg, setErrorMsg] = React.useState<string>('');

  function isEnableSignIn() {
    return email != '' && password != '' && emailError == '';
  }

  const onLogin = async () => {
    try {
      setErrorMsg('');
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);

        await navigation.replace('Home');
      }
    } catch (error) {
      setErrorMsg(error.message || '');
    }
  };

  return (
    <AuthLayout
      title="Let's Sign You In"
      subtitle="Welcome back, you've been missed!"
    >
      <View
        style={{
          flex: 1,
          marginTop: SIZES.height > 800 ? SIZES.padding * 2 : SIZES.radius,
        }}
      >
        {/* Form Inputs */}
        <FormInput
          label="Email"
          keyboardType="email-address"
          autoCompleteType="email"
          onChange={(value) => {
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          errorMsg={emailError}
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}
            >
              <Image
                source={
                  email == '' || (email != '' && emailError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    email == ''
                      ? COLORS.gray
                      : email != '' && emailError == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />

        <FormInput
          label="Password"
          secureTextEntry={!showPass}
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          onChange={(value) => setPassword(value)}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass(!showPass)}
            >
              <Image
                source={showPass ? icons.eye_close : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        />

        {/* Save me & Forgot pass */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomSwitch
              value={saveMe}
              onChange={(value) => setSaveMe(value)}
            />
          </View>
          <TextButton
            label="Forgot Password?"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.gray,
              ...FONTS.body4,
            }}
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </View>

        {/* Sign In & Sign Up */}
        <TextButton
          label="Sign In"
          disabled={isEnableSignIn() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignIn()
              ? COLORS.primary
              : COLORS.transparentPrimary,
          }}
          onPress={() => onLogin()}
        />

        <Text style={{ color: COLORS.red, ...FONTS.body4 }}>{errorMsg}</Text>

        {/* Sign Up */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
            Don't have an account?{' '}
          </Text>
          <TextButton
            label="Sign Up"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>

      {/* Footer */}
      <View>
        {/* <TextIconButton
                    containerStyle={{
                        height: 50,
                        alignItems: 'center',
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.blue,
                    }}
                    icon={icons.fb}
                    iconPosition="LEFT"
                    iconStyle={{
                        tintColor: COLORS.white
                    }}
                    label="Continue With Facebook"
                    labelStyle={{
                        marginLeft: SIZES.radius,
                        color: COLORS.white
                    }}
                    onPress={() => navigation.replace("Home")}
                />

                <TextIconButton
                    containerStyle={{
                        height: 50,
                        alignItems: 'center',
                        marginTop: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightGray2,
                    }}
                    icon={icons.google}
                    iconPosition="LEFT"
                    iconStyle={{
                        tintColor: null
                    }}
                    label="Continue With Google"
                    labelStyle={{
                        marginLeft: SIZES.radius,
                    }}
                    onPress={() => navigation.replace("Home")}
                /> */}
      </View>
    </AuthLayout>
  );
};

export default SignIn;

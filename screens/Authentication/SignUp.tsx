import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FormInput from '../../components/FormInput';
import TextButton from '../../components/TextButton';
import { utils } from '../../utils';
import { COLORS, FONTS, icons, SIZES } from '../../utils/constants';
import Firebase from '../../utils/firebase';
import AuthLayout from './AuthLayout';

const auth = Firebase.auth();

const SignUp = ({ navigation }) => {
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPass, setShowPass] = React.useState(false);

  const [emailError, setEmailError] = React.useState<string>('');
  const [phoneError, setPhoneError] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  function isEnableSignUp() {
    return (
      email != '' &&
      phone != '' &&
      password != '' &&
      emailError == '' &&
      phoneError == '' &&
      passwordError == ''
    );
  }

  const onHandleSignUp = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.createUserWithEmailAndPassword(email, password);

        await navigation.replace('Home');
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <AuthLayout
      title="Getting Started"
      subtitle="Create an account to continue!"
      titleContainerStyle={{
        marginTop: SIZES.height > 800 ? SIZES.radius : 0,
      }}
    >
      <View
        style={{
          flex: 1,
          marginTop: SIZES.height > 800 ? SIZES.padding : SIZES.radius,
        }}
      >
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
          label="Phone Number"
          keyboardType="phone-pad"
          autoCompleteType="tel"
          onChange={(value) => {
            utils.validatePhoneNumber(value, setPhoneError);
            setPhone(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          errorMsg={phoneError}
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}
            >
              <Image
                source={
                  phone == '' || (phone != '' && phoneError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    phone == ''
                      ? COLORS.gray
                      : phone != '' && phoneError == ''
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
          onChange={(value) => {
            utils.validatePassword(value, setPasswordError);
            setPassword(value);
          }}
          errorMsg={passwordError}
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

        <TextButton
          label="Sign Up"
          disabled={isEnableSignUp() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignUp()
              ? COLORS.primary
              : COLORS.transparentPrimary,
          }}
          onPress={() => onHandleSignUp()}
        />

        <Text style={{ color: COLORS.red, ...FONTS.body4 }}>{errorMsg}</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
            Already have an account?{' '}
          </Text>
          <TextButton
            label="Sign In"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => navigation.goBack()}
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

export default SignUp;

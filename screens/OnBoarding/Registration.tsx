import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from '@ui-kitten/components';
import axios from 'axios';
import Constants from 'expo-constants';
import firebase from 'firebase';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { CloseButton } from '../../components/common/buttons';
import DismissKeyboardView from '../../components/common/DismissKeyboardView';
import { CheckmarkIcon } from '../../components/common/icons';
import PlaidLink from '../../components/common/PlaidWebview';
import { ContinueButton } from '../../components/common/SignUpButtons';
import TextButton from '../../components/TextButton';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import { setRegistered, setStep } from '../../redux/registrationSlice';
import { RootState } from '../../redux/store';
import { COLORS, commonStyles, FONTS } from '../../utils/constants/theme';
interface RegistrationProps {
  navigation?: StackNavigationProp<any>;
}

interface IFormInputs {
  firstName: string;
  dob: string;
  lastName: string;
  ssn: string;
}

const Registration = ({ navigation }: RegistrationProps) => {
  const { user } = useContext(AuthenticatedUserContext);

  const insets = useSafeAreaInsets();
  const step = useSelector((state: RootState) => state.registration.step);
  const dispatch = useDispatch();

  const getYouSetup = {
    header: "Let's get you set up!",
    subheader:
      "We'll ask for some information so we can verify your identity and ensure your account is secure",
    infoNeeded: [
      {
        id: 1,
        title: 'Your personal information',
        subtitle: 'Your full name, DOB, and residential address.',
      },
      {
        id: 2,
        title: 'Your Social Security Number (SSN)',
        subtitle:
          " We're required to collect this to verify your identity and comply with anti money laundering regulations.",
      },
    ],
  };

  const checkIfUserExists = async () => {
    const data = await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get();

    if (data.exists) {
      const firebaseUser = data.data();

      if (firebaseUser.registered === true) {
        dispatch(setRegistered(true));
      }
    }
  };

  useEffect(() => {
    checkIfUserExists();
  }, []);

  const connectYourAccounts = {
    header: 'Connect your accounts',
    subheader:
      'All that’s left is to connect a funding source and loan accounts',
    infoNeeded: [
      {
        id: 1,
        title: 'Link your bank account',
        subtitle:
          'Verify your bank account instantly using our military-grade encryption',
      },
      {
        id: 2,
        title: 'Link your loans and credit providers',
        subtitle:
          'Connect your loans and credit cards so we can help you pay them off',
      },
      {
        id: 3,
        title: 'Set up payments',
        subtitle: 'Set up round ups and daily minimums to accelerate payoff',
      },
    ],
  };

  const renderView = (): JSX.Element => {
    switch (step) {
      case 0:
        return <InfoScreen content={getYouSetup} />;
      case 1:
        return <PersonalInfo />;
      case 2:
        return <GooglePlacesInput />;
      case 3:
        return <ConfirmDetails />;
      case 4:
        return <InfoScreen content={connectYourAccounts} />;
      case 5:
        return (
          <PlaidScreen
            title="Link your bank account"
            type="funding"
            key="funding"
          />
        );
      case 6:
        return (
          <PlaidScreen
            key="loans"
            title="Link your Loan account"
            type="loan"
            lastStep={true}
          />
        );
      default:
        <> </>;
    }
  };

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
             */}

            {step === 1 && <CloseButton onPress={() => dispatch(setStep(0))} />}
          </View>
          <View style={styles.ContentView}>{renderView()}</View>
        </View>
      </DismissKeyboardView>
    </View>
  );
};

const InfoScreen = ({
  content,
}: {
  content: {
    header: string;
    subheader: string;
    infoNeeded: { id: number; title: string; subtitle: string }[];
  };
}) => {
  const step = useSelector((state: RootState) => state.registration.step);
  const dispatch = useDispatch();

  return (
    <>
      <Text style={commonStyles.titleText}>{content.header}</Text>
      <Text
        style={{
          ...commonStyles.subTitleText,
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        {content.subheader}
      </Text>

      {content.infoNeeded.map(({ title, subtitle, id }) => (
        <CheckmarkCard title={title} subtitle={subtitle} key={id} />
      ))}
      <View style={commonStyles.flex} />
      <View style={commonStyles.buttonView}>
        <ContinueButton
          text="Get Started"
          onPress={() => dispatch(setStep(step + 1))}
        />
      </View>
    </>
  );
};

const CheckmarkCard = ({ title, subtitle }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 21,
        marginTop: 10,
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
          {title}
        </Text>
        <Text
          style={{
            ...commonStyles.subTitleText,
            paddingRight: 50,
            marginRight: 50,
            marginTop: 10,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

const PersonalInfo = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const step = useSelector((state: RootState) => state.registration.step);
  const dispatch = useDispatch();

  const schema = yup
    .object({
      firstName: yup
        .string()
        .required('A First Name is required')
        .typeError('A First Name is required'),
      lastName: yup
        .string()
        .required('A Last Name is required')
        .typeError('A Last Name is required'),
      dob: yup
        .string()
        .required('A Date of birth is required')
        .typeError('A Date of birth is required'),
      ssn: yup
        .string()
        .required('A Social Security Number is required')
        .matches(/^[0-9]+$/, 'A Social Security Number must be only digits')
        .min(9, 'A Social Security Number  must be exactly 9 digits')
        .max(9, 'A Social Security Number  must be exactly 9 digits')
        .typeError('A Social Security Number is required'),
    })
    .required();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      ssn: '',
    },
  });

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setValue('dob', doc.data().dob ? doc.data().dob : '');
          setValue('firstName', doc.data().firstName || '');
          setValue('lastName', doc.data().lastName || '');
          setValue('ssn', doc.data().ssn || '');
        }
      });
  }, []);
  const onSubmit = (data: IFormInputs) => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        ...data,
      });

    dispatch(setStep(step + 1));
  };
  return (
    <>
      <Text style={commonStyles.titleText}>Personal Information</Text>
      <MWTextInput
        control={control}
        name="firstName"
        placeholder="First Name"
        autoCompleteType="name"
      />
      {errors.firstName && (
        <Text style={styles.inputError}>{errors.firstName.message}</Text>
      )}

      <MWTextInput control={control} name="lastName" placeholder="Last Name" />
      {errors.lastName && (
        <Text style={styles.inputError}>{errors.lastName.message}</Text>
      )}

      <MWTextInput
        control={control}
        name="dob"
        placeholder="Date of Birth"
        isDate={true}
      />
      {errors.dob && (
        <Text style={styles.inputError}>{errors.dob.message}</Text>
      )}

      <MWTextInput
        control={control}
        name="ssn"
        placeholder="SSN"
        keyboardType="phone-pad"
        autoCompleteType="tel"
      />
      {errors.ssn && (
        <Text style={styles.inputError}>{errors.ssn.message}</Text>
      )}

      <View style={commonStyles.flex} />
      <View style={commonStyles.buttonView}>
        <ContinueButton onPress={handleSubmit(onSubmit)} />
      </View>
    </>
  );
};

const MWTextInput = ({
  control,
  name,
  isDate,
  ...otherProps
}: {
  control: Control<IFormInputs, object>;
  name: keyof IFormInputs;
  isDate?: boolean;
} & TextInputProps) => {
  const [inputFocused, setInputFocused] = React.useState<boolean>(false);
  const secondaryInputStyle = inputFocused ? commonStyles.textInputFocused : {};

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (onChange, date) => {
    onChange(moment(date).format('MMM Do, YYYY'));
    hideDatePicker();
  };

  const onFocus = () => {
    setInputFocused(true);
    if (isDate) showDatePicker();
  };

  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              onChangeText={onChange}
              value={value}
              style={[styles.input, secondaryInputStyle]}
              onFocus={(): void => onFocus()}
              onBlur={(): void => setInputFocused(false)}
              {...otherProps}
            />
            {isDate && (
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(value) => handleConfirm(onChange, value)}
                onCancel={hideDatePicker}
              />
            )}
          </>
        )}
        name={name}
      />
    </>
  );
};

const GooglePlacesInput = () => {
  const { user } = useContext(AuthenticatedUserContext);

  const [address, setAddress] = React.useState<string>('');
  const ref = useRef<GooglePlacesAutocompleteRef>();

  const step = useSelector((state: RootState) => state.registration.step);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (ref?.current) {
            ref?.current?.setAddressText(doc.data().address || '');
          }
          setAddress(doc.data().address || '');
        }
      });
  }, []);
  return (
    <>
      <Text style={commonStyles.titleText}>what's your address? </Text>

      <View style={styles.container}>
        <GooglePlacesAutocomplete
          enableHighAccuracyLocation={true}
          placeholder={address ? address : '12 Sesame Street'}
          query={{
            key: Constants.manifest.extra.mapsAPIkey,
            language: 'en', // language of the results
          }}
          onPress={(data, details = null) => {
            firebase.firestore().collection('users').doc(user.uid).update({
              address: data.description,
            });
          }}
          onFail={(error) => console.error(error)}
          ref={ref}
        />
      </View>

      <View style={commonStyles.buttonView}>
        <ContinueButton onPress={() => dispatch(setStep(step + 1))} />
      </View>
    </>
  );
};

const ConfirmDetails = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [data, setData] = React.useState(null);

  const step = useSelector((state: RootState) => state.registration.step);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setData(doc.data());
        }
      });
  }, []);

  return (
    <>
      <Text style={commonStyles.titleText}>Confirm your details</Text>
      <Text
        style={{
          ...commonStyles.subTitleText,
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        Please take a moment to make sure all your information is correct.
      </Text>

      {data && (
        <>
          <View
            style={{
              width: '100%',
              borderBottomColor: 'grey',
              borderBottomWidth: 0.2,
              borderTopColor: 'grey',
              borderTopWidth: 0.2,
              paddingVertical: 15,
            }}
          >
            <Text style={{ ...commonStyles.subTitleText, marginBottom: 15 }}>
              Legal Name
            </Text>
            <Text style={commonStyles.h3Text}>
              {data.firstName} {data.lastName}
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              borderBottomColor: 'grey',
              borderBottomWidth: 0.2,
              paddingVertical: 15,
            }}
          >
            <Text style={{ ...commonStyles.subTitleText, marginBottom: 15 }}>
              Date Of Birth
            </Text>
            <Text style={commonStyles.h3Text}>{data.dob}</Text>
          </View>

          <View
            style={{
              width: '100%',
              borderBottomColor: 'grey',
              borderBottomWidth: 0.2,
              paddingVertical: 15,
            }}
          >
            <Text style={{ ...commonStyles.subTitleText, marginBottom: 15 }}>
              Address
            </Text>
            <Text style={commonStyles.h3Text}>{data.address}</Text>
          </View>

          <View
            style={{
              width: '100%',
              borderBottomColor: 'grey',
              borderBottomWidth: 0.2,
              paddingVertical: 15,
            }}
          >
            <Text style={{ ...commonStyles.subTitleText, marginBottom: 15 }}>
              SSN
            </Text>
            <Text style={commonStyles.h3Text}>{data.ssn}</Text>
          </View>
        </>
      )}
      <View style={commonStyles.flex} />
      <View style={commonStyles.buttonView}>
        <ContinueButton onPress={() => dispatch(setStep(step + 1))} />
        <TextButton
          label={`I'd like to make changes`}
          buttonContainerStyle={{
            backgroundColor: null,
            marginTop: 15,
            marginBottom: 10,
          }}
          labelStyle={{
            color: COLORS.primary,
            ...FONTS.body4,
          }}
          onPress={() => dispatch(setStep(1))}
        />
      </View>
    </>
  );
};

const PlaidScreen = ({
  title,
  type,
  lastStep,
}: {
  title: string;
  type: 'funding' | 'loan';
  lastStep?: boolean;
}) => {
  const [data, setData] = React.useState(null);
  const { user } = useContext(AuthenticatedUserContext);
  const step = useSelector((state: RootState) => state.registration.step);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const { data } = await axios.post(
      `${Constants.manifest.extra.apiUrl}/createLinkToken`,
      {
        fundingType: type,
      }
    );
    setData(data);
  };
  useEffect(() => {
    fetchData();
  }, [type]);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@registered', value);
      dispatch(setRegistered(true));
    } catch (e) {
      console.log({ e });
    }
  };

  console.log({ lastStep, data, type });

  return (
    <>
      <Text style={commonStyles.titleText}>{title}</Text>

      {data && (
        <PlaidLink
          linkToken={data?.linkToken}
          onEvent={(event) => {}}
          onExit={(exit) => console.log(exit)}
          onSuccess={async (success) => {
            const mwAccessToken = await user.getIdToken();
            axios
              .post(`${Constants.manifest.extra.apiUrl}/tokenExchange`, {
                publicToken: success.publicToken,
                mwAccessToken,
                fundingType: type,
                lastStep,
              })
              .then(async (response) => {
                if (lastStep) {
                  await storeData('true');
                } else {
                  dispatch(setStep(step + 1));
                }
              });
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    width: '100%',
  },
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
  input: {
    color: '#234236',
    fontFamily: 'Ageo',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
    backgroundColor: 'transparent',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#F0EEEE',
    paddingBottom: 2,
    height: 40,
    alignSelf: 'stretch',
    padding: 20,
    margin: 5,
    marginBottom: 10,
  },
  inputError: {
    marginHorizontal: 20,
    color: 'red',
  },
});

export default Registration;

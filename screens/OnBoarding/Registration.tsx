import { yupResolver } from '@hookform/resolvers/yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from '@ui-kitten/components';
import React from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import {
  Button,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { CloseButton } from '../../components/common/buttons';
import DismissKeyboardView from '../../components/common/DismissKeyboardView';
import { CheckmarkIcon } from '../../components/common/icons';
import { ContinueButton } from '../../components/common/SignUpButtons';
import { setStep } from '../../redux/registrationSlice';
import { RootState } from '../../redux/store';
import { commonStyles } from '../../utils/constants/theme';

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
  const insets = useSafeAreaInsets();
  const step = useSelector((state: RootState) => state.registration.step);
  const dispatch = useDispatch();
  // dispatch(setStep(1));
  const handleContinue = () => {
    dispatch(setStep(step + 1));
  };

  const renderView = (): JSX.Element => {
    switch (step) {
      case 0:
        return <GetYouSetup handleContinue={handleContinue} />;
        break;
      case 1:
        return <PersonalInfo />;
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
            {/* <BackButton onPress={prevPdob} />
             */}

            {step === 1 && <CloseButton onPress={() => {}} />}
          </View>
          <View style={styles.ContentView}>{renderView()}</View>
        </View>
      </DismissKeyboardView>
    </View>
  );
};

const GetYouSetup = ({ handleContinue }) => {
  const infoNeeded = [
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
  ];

  return (
    <>
      <Text style={commonStyles.titleText}>Let's get you set up!</Text>
      <Text
        style={{
          ...commonStyles.subTitleText,
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        We'll ask for some information so we can verify your identity and ensure
        your account is secure
      </Text>

      {infoNeeded.map(({ title, subtitle, id }) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingHorizontal: 21,
          }}
          key={id}
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
      ))}
      <View style={commonStyles.flex} />
      <View style={commonStyles.buttonView}>
        <ContinueButton text="Get Started" onPress={() => handleContinue()} />
      </View>
    </>
  );
};

const PersonalInfo = () => {
  const schema = yup
    .object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      dob: yup.string().required(),
      ssn: yup.string().required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      ssn: '',
    },
  });
  const onSubmit = (data: IFormInputs) => {
    console.log({ data });
  };

  return (
    <>
      <Text style={commonStyles.titleText}>Personal Information</Text>
      <MWTextInput
        control={control}
        name="firstName"
        placeholder="first Name"
      />
      {errors.firstName && <Text>{errors.firstName.message}</Text>}

      <MWTextInput control={control} name="lastName" placeholder="Last Name" />
      {errors.lastName && <Text>{errors.lastName.message}</Text>}

      <MWTextInput control={control} name="dob" placeholder="dob" />
      {errors.dob && <Text>{errors.dob.message}</Text>}

      <View style={commonStyles.flex} />
      <View style={commonStyles.buttonView}>
        <ContinueButton text="Get Started" onPress={handleSubmit(onSubmit)} />
      </View>
    </>
  );
};

const MWTextInput = ({
  control,
  name,
  ...otherProps
}: {
  control: Control<IFormInputs, object>;
  name: keyof IFormInputs;
} & TextInputProps) => {
  const [inputFocused, setInputFocused] = React.useState<boolean>(false);
  const secondaryInputStyle = inputFocused ? commonStyles.textInputFocused : {};
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <TextInput
          onChangeText={onChange}
          value={value.toString()}
          {...otherProps}
          style={[styles.input, secondaryInputStyle]}
          onFocus={(): void => setInputFocused(true)}
          onBlur={(): void => setInputFocused(false)}
        />
      )}
      name={name}
    />
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
});

export default Registration;

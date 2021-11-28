import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '@ui-kitten/components';
import axios from 'axios';
import Constants from 'expo-constants';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlaidLink from '../../components/common/PlaidWebview';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import { setRegistered, setStep } from '../../redux/registrationSlice';
import { RootState } from '../../redux/store';
import { commonStyles } from '../../utils/constants/theme';

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
  
    const storeRegisteredToLocalStorage = async (value) => {
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
                    await storeRegisteredToLocalStorage('true');
                    dispatch(setStep(0));
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

    export default PlaidScreen;
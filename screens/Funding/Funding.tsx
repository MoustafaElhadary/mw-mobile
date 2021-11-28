import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Constants from 'expo-constants';
import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import { setRoundups } from '../../redux/roundupsSlice';
import { RootState } from '../../redux/store';
import { utils } from '../../utils';
import { COLORS, SIZES } from '../../utils/constants';

const Funding = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user } = useContext(AuthenticatedUserContext);
  const { nextPaymentDate, upcomingDepositTotal } = useSelector(
    (state: RootState) => state.roundups.roundups
  );
  const fetchRoundups = async () => {
    const mwAccessToken = await user.getIdToken();
    axios
      .post(`${Constants.manifest.extra.apiUrl}/roundups`, {
        mwAccessToken,
      })
      .then(async (response) => {
        dispatch(setRoundups(response.data));
      });
  };

  useEffect(() => {
    fetchRoundups();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        backgroundColor: '#F8F8F7',
        paddingHorizontal: 15,
        paddingVertical: 25,
      }}
    >
      <Card
        title="Roundups"
        footer="Manage Roundups"
        onPress={() => navigation.navigate('ManageRoundups')}
      >
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ ...styles.title, flex: 1 }}>This week </Text>

          <Text style={styles.title}>Next deposit</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            marginBottom: 20,
          }}
        >
          <Text style={{ ...styles.subtitle, flex: 1 }}>
            {`$${utils.formatMoney(upcomingDepositTotal, 2)}`}
          </Text>

          <Text style={styles.subtitle}>
            {moment(nextPaymentDate).format('MMMM Do, YYYY')}
          </Text>
        </View>
      </Card>
      <Card
        title="Auto Deposits"
        containerStyle={{ marginTop: 40 }}
        footer="Set up Auto deposits"
        onPress={() => navigation.navigate('AutoDeposits')}
      >
        <View
          style={{
            flexDirection: 'row',
            padding: SIZES.padding,
          }}
        >
          <Text
            style={{
              color: '#234236',
              fontFamily: 'PublicSans-SemiBold',
              fontSize: 15,
              lineHeight: 20,
            }}
          >
            Set it and forget it! Automate your deposits to suit your lifestyle
          </Text>
        </View>
      </Card>
    </View>
  );
};

export type CardProps = {
  title: string;
  footer: string;
  containerStyle?: ViewStyle;
  onPress: () => void;
  children: JSX.Element | JSX.Element[];
};

const Card = ({
  title,
  footer,
  children,
  onPress,
  containerStyle,
}: CardProps) => {
  return (
    <TouchableOpacity
      style={{
        borderColor: COLORS.lightGray1,
        borderWidth: 0.5,
        paddingTop: SIZES.padding,
        borderRadius: 6,
        backgroundColor: 'white',
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 20,
          borderBottomColor: COLORS.lightGray1,
          borderBottomWidth: 0.5,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Text style={styles.header}>{title}</Text>
      </View>

      {children}
      <View
        style={{
          flexDirection: 'row',
          borderTopColor: COLORS.lightGray1,
          borderTopWidth: 0.5,
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      >
        <Text style={styles.footer}> {footer} </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Funding;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    color: '#234236',
    fontFamily: 'Ageo',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '400',
    textAlign: 'left',
    width: '100%',
    alignSelf: 'stretch',
  },
  title: {
    color: '#234236',
    fontFamily: 'PublicSans-SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
  subtitle: {
    color: '#8C9F97',
    fontFamily: 'PublicSans-SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
  footer: {
    flex: 1,
    color: '#398E71',
    fontFamily: 'PublicSans-SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
});

import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  RadioButtonOffIcon,
  RadioButtonOnIcon
} from '../../components/common/icons';
import Layout from '../../components/common/Layout';
import { RootState } from '../../redux/store';
import { Account } from '../../redux/userSlice';
import { utils } from '../../utils';
import { COLORS } from '../../utils/constants';

const ConfirmAutoDeposits = () => {
  const [selected, setSelected] = React.useState<Account>(null);

  const navigation = useNavigation();
  const route = useRoute();
  const { amount, frequency } = route.params as {
    amount: number;
    frequency: string;
  };
  const { accounts } = useSelector((state: RootState) => state.user);

  return (
    <Layout
      title="Auto Deposit"
      containerStyle={{
        backgroundColor: '#F8F8F7',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
      }}
      headerStyle={{
        backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          width: '100%',
        }}
      >
        <Card title="Amount" rightText={`$${utils.formatMoney(amount)}`} />
        <Card title="Frequency" rightText={frequency} />
        <View
          style={{
            backgroundColor: '#F8F8F7',
            paddingHorizontal: 25,
            paddingVertical: 14,
            borderBottomColor: COLORS.lightGray1,
            borderBottomWidth: 0.3,
          }}
        >
          <Text
            style={{
              textAlign: 'left',
              color: '#8C9F97',
              fontFamily: 'PublicSans-SemiBold',
              fontSize: 12,
              lineHeight: 16,
            }}
          >
            From this account
          </Text>
        </View>

        {accounts
          .filter((account) => account.type === 'depository')
          .map((account) => {
            const name = `${account.institution.name} ${account.name}`;
            return (
              <Card
                title={name}
                rightText={`**** ${account.mask}`}
                selected={account === selected}
                onPress={() => setSelected(account)}
                showRadio
              />
            );
          })}
        <View
          style={{
            paddingHorizontal: 25,
            paddingVertical: 14,
            borderBottomColor: COLORS.lightGray1,
            borderBottomWidth: 0.5,
            backgroundColor: 'white',
            width: '100%',
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: '#398E71',
                fontFamily: 'PublicSans-SemiBold',
                fontSize: 12,
                lineHeight: 16,
                flex: 1,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Add a bank account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: selected === null ? '#8C9F97' : '#068466',
            borderRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginTop: 40,
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={() => {
            navigation.navigate('YouAreSet');
          }}
          disabled={selected === null}
        >
          <Text
            style={{
              color: '#fff',
              fontFamily: 'PublicSans-SemiBold',
              fontSize: 18,
              fontStyle: 'normal',
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export type CardProps = {
  title: string;
  rightText: string;
  selected?: boolean;
  showRadio?: boolean;
  onPress?: () => void;
};
const Card = ({
  title,
  rightText,
  onPress,
  selected,
  showRadio,
}: CardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress || (() => {})}
      disabled={!onPress}
      style={{
        paddingHorizontal: 25,
        paddingVertical: 14,
        borderBottomColor: COLORS.lightGray1,
        borderBottomWidth: 0.5,
        backgroundColor: 'white',
        width: '100%',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ ...styles.subtitle, flex: 1 }}>{title}</Text>

        <Text style={styles.title}>{rightText}</Text>
        {showRadio && (
          <View style={{ marginLeft: 10 }}>
            {selected ? (
              <RadioButtonOnIcon width="24" height="24" fill="#068466" />
            ) : (
              <RadioButtonOffIcon width="24" height="24" fill="#70706F" />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default ConfirmAutoDeposits;

const styles = StyleSheet.create({
  buttonText: {
    color: '#70706F',
    fontFamily: 'Ageo-Bold',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
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
});

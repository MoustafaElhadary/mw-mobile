import _ from 'lodash';
import { Institution } from 'plaid';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { CloseIcon } from '../../components/common/icons';
import Layout from '../../components/common/Layout';
import { RootState } from '../../redux/store';
import { Account } from '../../redux/userSlice';
import { COLORS } from '../../utils/constants';

const FinancialAccounts = () => {
  const { accounts } = useSelector((state: RootState) => state.user);

  const fundingAccounts = _.groupBy(
    accounts.filter((account) => account.type === 'depository'),
    'item_id'
  );
  const loanAccounts = _.groupBy(
    accounts.filter((account) => account.type === 'loan'),
    'item_id'
  );

  console.log({ fundingAccounts, loanAccounts });

  return (
    <Layout
      title="Financial Accounts"
      containerStyle={{
        backgroundColor: '#F8F8F7',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'center',
      }}
    >
      <Text
        style={{
          color: '#8C9F97',
          fontFamily: 'PublicSans-SemiBold',
          fontSize: 12,
          lineHeight: 16,
          paddingTop: 18,
          paddingLeft: 20,
          paddingRight: 40,
        }}
      >
        Link all of your financial accounts to get a complete view of your
        finances
      </Text>
      <Text
        style={{
          paddingLeft: 20,
          paddingTop: 32,
          paddingBottom: 18,
          color: COLORS.primary,
          fontFamily: 'Ageo',
          fontSize: 18,
          lineHeight: 24,
        }}
      >
        Funding Sources
      </Text>

      <View
        style={{
          width: '100%',
        }}
      >
        {Object.keys(fundingAccounts).map((key) => {
          const accounts = fundingAccounts[key];
          const institution = accounts[0].institution;
          return (
            <AccountCard
              key={JSON.stringify(accounts)}
              institution={institution}
              accounts={accounts}
            />
          );
        })}
      </View>

      {/* +Add a funding source */}
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 25,
          paddingVertical: 14,
          borderBottomColor: COLORS.lightGray1,
          borderBottomWidth: 0.3,
          borderTopColor: COLORS.lightGray1,
          borderTopWidth: 0.3,
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
              textAlign: 'left',
              color: '#398E71',
              fontFamily: 'PublicSans-SemiBold',
              fontSize: 16,
              lineHeight: 24,
              flex: 1,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +Add a funding source
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          paddingLeft: 20,
          paddingTop: 32,
          paddingBottom: 18,
          color: COLORS.primary,
          fontFamily: 'Ageo',
          fontSize: 18,
          lineHeight: 24,
        }}
      >
        Loans
      </Text>
      <View
        style={{
          width: '100%',
        }}
      >
        {Object.keys(loanAccounts).map((key) => {
          const accounts = loanAccounts[key];
          const institution = accounts[0].institution;
          return (
            <AccountCard
              key={JSON.stringify(accounts)}
              institution={institution}
              accounts={accounts}
            />
          );
        })}
      </View>

      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 25,
          paddingVertical: 14,
          borderBottomColor: COLORS.lightGray1,
          borderBottomWidth: 0.3,
          borderTopColor: COLORS.lightGray1,
          borderTopWidth: 0.3,
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
              textAlign: 'left',
              color: '#398E71',
              fontFamily: 'PublicSans-SemiBold',
              fontSize: 16,
              lineHeight: 24,
              flex: 1,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +Add a loan
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const AccountCard = ({
  accounts,
  institution,
}: {
  accounts: Account[];
  institution: Institution;
}) => {
  return (
    <View
      style={{
        paddingHorizontal: 25,
        paddingVertical: 14,
        borderBottomColor: COLORS.lightGray1,
        borderBottomWidth: 0.3,
        borderTopColor: COLORS.lightGray1,
        borderTopWidth: 0.3,
        backgroundColor: 'white',
        width: '100%',
        flexDirection: 'column',
        marginTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Image
            source={{
              uri: `data:image/jpeg;base64,${institution.logo}`,
            }}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
          <Text>{institution.name}</Text>
        </View>
        <CloseIcon width="24" height="24" fill="#8C9F97" />
      </View>
      <View
        style={{
          backgroundColor: '#FBFBFB',
          borderRadius: 10,
          borderColor: '#F0EEEE',
          borderWidth: 1,
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {accounts.map((account, index) => {
          return (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: index === 0 ? 0 : 10,
                borderTopColor: '#F0EEEE',
                borderTopWidth: index === 0 ? 0 : 1,
                padding: 10,
                marginBottom: index === 0 ? 0 : 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'column',
                }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: 'PublicSans-SemiBold',
                    fontSize: 13,
                    lineHeight: 24,
                  }}
                >
                  {account.name}
                </Text>
                <Text
                  style={{
                    color: '#8C9F97',
                    fontFamily: 'PublicSans-SemiBold',
                    fontSize: 12,
                    lineHeight: 16,
                  }}
                >
                  {account.type} | **** {account.mask}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default FinancialAccounts;

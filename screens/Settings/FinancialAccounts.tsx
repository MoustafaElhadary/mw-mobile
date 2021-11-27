import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DeleteIcon, EditIcon } from '../../components/common/icons';
import Layout from '../../components/common/Layout';
import { COLORS } from '../../utils/constants';

const FinancialAccounts = () => {
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
          color: '#234236',
          fontFamily: 'Ageo',
          fontSize: 18,
          lineHeight: 24,
        }}
      >
        Funding Sources
      </Text>
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
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <Text>Chase Logo</Text>
          <DeleteIcon width="24" height="24" fill="#8C9F97" />
        </View>
        <View
          style={{
            backgroundColor: '#FBFBFB',
            borderRadius: 10,
            borderColor: '#F0EEEE',
            borderWidth: 1,
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
              }}
            >
              <Text
                style={{
                  color: '#234236',
                  fontFamily: 'PublicSans-SemiBold',
                  fontSize: 13,
                  lineHeight: 24,
                }}
              >
                Chase sapphire reserve
              </Text>
              <Text
                style={{
                  color: '#8C9F97',
                  fontFamily: 'PublicSans-SemiBold',
                  fontSize: 12,
                  lineHeight: 16,
                }}
              >
                Credit | ***1234
              </Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <EditIcon width="24" height="24" fill="#8C9F97" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              borderTopColor: '#F0EEEE',
              borderTopWidth: 1,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
              }}
            >
              <Text
                style={{
                  color: '#234236',
                  fontFamily: 'PublicSans-SemiBold',
                  fontSize: 13,
                  lineHeight: 24,
                }}
              >
                Chase spend account
              </Text>
              <Text
                style={{
                  color: '#8C9F97',
                  fontFamily: 'PublicSans-SemiBold',
                  fontSize: 12,
                  lineHeight: 16,
                }}
              >
                Checking | ***1234
              </Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <EditIcon width="24" height="24" fill="#8C9F97" />
            </TouchableOpacity>
          </View>
        </View>
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
            +Add a funding source
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          paddingLeft: 20,
          paddingTop: 32,
          paddingBottom: 18,
          color: '#234236',
          fontFamily: 'Ageo',
          fontSize: 18,
          lineHeight: 24,
        }}
      >
        Loans
      </Text>
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
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <Text>Fedloan Logo</Text>
          <DeleteIcon width="24" height="24" fill="#8C9F97" />
        </View>
        <View
          style={{
            backgroundColor: '#FBFBFB',
            borderRadius: 10,
            borderColor: '#F0EEEE',
            borderWidth: 1,
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
              }}
            >
              <Text
                style={{
                  color: '#234236',
                  fontFamily: 'PublicSans-SemiBold',
                  fontSize: 13,
                  lineHeight: 24,
                }}
              >
                Student loan
              </Text>
              <Text
                style={{
                  color: '#8C9F97',
                  fontFamily: 'PublicSans-SemiBold',
                  fontSize: 12,
                  lineHeight: 16,
                }}
              >
                Loan | ***1234
              </Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <EditIcon width="24" height="24" fill="#8C9F97" />
            </TouchableOpacity>
          </View>
        </View>
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

export default FinancialAccounts;

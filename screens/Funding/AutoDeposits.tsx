import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    GestureResponderEvent,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { BackspaceIcon } from '../../components/common/icons';
import Layout from '../../components/common/Layout';
import { utils } from '../../utils';

const AutoDeposits = () => {
  const [amount, setAmount] = React.useState(600);
  const [frequency, setFrequency] = React.useState('Weekly');
  const navigation = useNavigation();

  const handleAmountChange = (value: number) => {
    setAmount(amount * 10 + value);
  };

  const handleAmountBackspace = () => {
    if (amount > 0) {
      setAmount(Math.floor(amount / 10));
    }
  };
  return (
    <Layout
      title="Auto Deposit"
      containerStyle={{
        backgroundColor: '#F8F8F7',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
      }}
      headerStyle={{
        backgroundColor: '#fff',
      }}
    >
      <Text
        style={{
          color: '#474D50',
          fontFamily: 'Ageo',
          fontSize: 48,
          paddingVertical: 40,
        }}
      >
        {`$${utils.formatMoney(amount)}`}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <Pill
          title="Weekly"
          selected={frequency === 'Weekly'}
          onPress={() => {
            setFrequency('Weekly');
          }}
        />
        <Pill
          title="Bi-weekly"
          selected={frequency === 'Bi-weekly'}
          onPress={() => {
            setFrequency('Bi-weekly');
          }}
        />
        <Pill
          title="Monthly"
          selected={frequency === 'Monthly'}
          onPress={() => {
            setFrequency('Monthly');
          }}
        />
      </View>

      <Text
        style={{
          color: '#398E71',
          fontFamily: 'Ageo',
          fontSize: 18,
          paddingTop: 40,
          lineHeight: 24,
        }}
      >
        Projected savings: $38,230
      </Text>
      <Text
        style={{
          color: '#8C9F97',
          fontFamily: 'PublicSans-SemiBold',
          fontSize: 13,
          lineHeight: 24,
        }}
      >
        Time saved: 3 years 4 months
      </Text>

      <View
        style={{
          marginTop: 60,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flex: 1,
            width: '100%',
          }}
        >
          <TouchableOpacity
            style={{
              padding: 20,
            }}
            onPress={() => handleAmountChange(1)}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAmountChange(2)}
            style={{
              padding: 20,
            }}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAmountChange(3)}
            style={{
              padding: 20,
            }}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flex: 1,
            width: '100%',
          }}
        >
          <TouchableOpacity
            onPress={() => handleAmountChange(4)}
            style={{
              padding: 20,
            }}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAmountChange(5)}
            style={{
              padding: 20,
            }}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAmountChange(6)}
            style={{
              padding: 20,
            }}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flex: 1,
            width: '100%',
          }}
        >
          <TouchableOpacity
            onPress={() => handleAmountChange(7)}
            style={{
              padding: 20,
            }}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAmountChange(8)}
            style={{
              padding: 20,
            }}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAmountChange(9)}
            style={{
              padding: 20,
            }}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flex: 1,
            width: '100%',
          }}
        >
          <TouchableOpacity onPress={() => {}} disabled>
            <Text
              style={{
                color: '#F8F8F7',
                fontFamily: 'Ageo-Bold',
                fontSize: 24,
                fontStyle: 'normal',
                fontWeight: '700',
                textAlign: 'center',
                flex: 1,
              }}
            >
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAmountChange(0)}
            style={{
              padding: 20,
            }}
          >
            <Text
              style={{
                color: '#70706F',
                fontFamily: 'Ageo-Bold',
                fontSize: 24,
                fontStyle: 'normal',
                fontWeight: '700',
                textAlign: 'center',
                flex: 1,
                marginRight: -20,
              }}
            >
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAmountBackspace()}>
            <BackspaceIcon width="30" height="30" fill="#70706F" />
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
            backgroundColor: '#068466',
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
            navigation.navigate('ConfirmAutoDeposits', {
              amount,
              frequency
            });
          }}
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
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

interface PillProps {
  title: string;
  selected?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}
const Pill = ({ selected = false, title, onPress }: PillProps) => {
  return (
    <View>
      {selected ? (
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: '#068466',
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 5,
            paddingHorizontal: 20,
            alignSelf: 'stretch',
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'Ageo-Bold',
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={{
            borderColor: '#398E71',
            borderWidth: 1,
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 5,
            paddingHorizontal: 20,
            alignSelf: 'stretch',
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: '#398E71',
              fontFamily: 'Ageo-Bold',
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AutoDeposits;

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
});

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { BackspaceIcon } from '../../components/common/icons';
import Layout from '../../components/common/Layout';
import { RootState } from '../../redux/store';
import { utils } from '../../utils';

const AutoDeposits = () => {
  const [amount, setAmount] = React.useState(600);
  const [frequency, setFrequency] = React.useState<
    'Weekly' | 'Bi-weekly' | 'Monthly'
  >('Weekly');
  const navigation = useNavigation();
  const studentLoan = useSelector((state: RootState) => state.user.studentLoan);

  const [savingAmount, setSavingAmount] = React.useState(0);
  const [timeSaving, setTimeSaving] = React.useState('');

  const calculateSavings = () => {
    const multiplier =
      frequency === 'Weekly' ? 4 : frequency === 'Bi-weekly' ? 2 : 1;

    const studentLoanAverageInterestRate = studentLoan.interest.apr || 0;
    const studentLoanBalance = studentLoan.balance || 0;

    const loanTermInMonths = moment(
      new Date(
        studentLoan.loans[0].loan_status.end_date ||
          studentLoan.loans[0].expected_payoff_date
      )
    ).diff(new Date(), 'month', true);

    const monthlyInterest = studentLoanAverageInterestRate / 100 / 12;

    // formula to calculate monthly payment is MonthlyPayment = (LoanAmount * MonthlyInterestRate) / (1 - (1 + MonthlyInterestRate)^(-LoanTermInMonths))
    const monthlyPayment =
      (monthlyInterest * studentLoanBalance) /
      (1 - Math.pow(1 + monthlyInterest, -1 * loanTermInMonths));

    //TODO: fetch from DB (this should be calculated on load addition)
    const initialAssumedInterestPaid =
      monthlyPayment * loanTermInMonths - studentLoanBalance;

    //TODO: fetch monthly extra payments from DB (average roundups from last month + employer match + family match)
    //calculate number of payments with extra payments
    const newPayment = monthlyPayment + amount * multiplier;

    // formula to calculate new number of months after extra payments is numberOfMonths = (-1 * log(1 - (monthly interest * LoanAmount) / newPayment )) / log(1 + MonthlyInterestRate)
    const newLoanTermInMonths =
      (-1 * Math.log(1 - (monthlyInterest * studentLoanBalance) / newPayment)) /
      Math.log(1 + monthlyInterest);

    const newAssumedInterestPaid =
      newPayment * newLoanTermInMonths - studentLoanBalance;

    const interestSavings = initialAssumedInterestPaid - newAssumedInterestPaid;

    const monthsSaved = loanTermInMonths - newLoanTermInMonths;

    var duration = moment.duration(monthsSaved, 'months');

    const timeSavedString = `${duration.years()} years, ${Math.round(
      duration.months()
    )} months`;

    setSavingAmount(interestSavings);
    setTimeSaving(timeSavedString);
  };

  useEffect(() => {
    calculateSavings();
  }, [amount, frequency]);

  const handleAmountChange = (value: number) => {
    const newAmount = amount * 10 + value;

    if (newAmount > 5000) {
      setAmount(5000);
    } else {
      setAmount(newAmount);
    }
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
        flex: 1,
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
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {`$${amount}`}
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
          textAlign: 'center',
        }}
      >
        Projected savings: {`$${utils.formatMoney(savingAmount)}`}
      </Text>
      <Text
        style={{
          color: '#8C9F97',
          fontFamily: 'PublicSans-SemiBold',
          fontSize: 13,
          lineHeight: 24,
          textAlign: 'center',
        }}
      >
        Time saved: {timeSaving}
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
              frequency,
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

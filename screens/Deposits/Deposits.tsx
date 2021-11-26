import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DeleteIcon } from '../../components/common/icons';
import { COLORS } from '../../utils/constants';

const Deposits = () => {
  const createTwoButtonAlert = () =>
    Alert.alert(
      'Are you sure you want to cancel this deposit?',
      'Your deposit of $600.00 will be cancelled',
      [
        {
          text: 'Never mind',
          onPress: () => console.log('Never mind Pressed'),
        },
        {
          text: 'Yes, cancel it',
          onPress: () => console.log('Cancel Pressed'),
          style: 'destructive',
        },
      ]
    );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#F8F8F7',
        width: '100%',
      }}
    >
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
        Upcoming
      </Text>
      <UpcomingCard
        date={'January 29'}
        subtitle={'A one-time deposit of $600.00 from your World Bank account'}
        onPress={createTwoButtonAlert}
        isFirst
      />
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
        Previous
      </Text>
      <PreviousCard
        date={'December 1, 2019'}
        subtitle={'Funds paid to Fedloan'}
        subtitleTotal={'$235.00'}
        isFirst
      />
      <PreviousCard
        date={'December 1, 2019'}
        subtitle={'Funds paid to Fedloan'}
        subtitleTotal={'$235.00'}
      />
      <PreviousCard
        date={'December 1, 2019'}
        subtitle={'Funds paid to Fedloan'}
        subtitleTotal={'$235.00'}
      />
      <PreviousCard
        date={'December 1, 2019'}
        subtitle={'Funds paid to Fedloan'}
        subtitleTotal={'$235.00'}
      />
    </View>
  );
};

export type PreviousCardProps = {
  date: string;
  subtitle?: string;
  subtitleTotal?: string;
  isFirst?: boolean;
};

const PreviousCard = ({
  date,
  subtitle,
  subtitleTotal,
  isFirst,
}: PreviousCardProps) => {
  return (
    <View
      style={{
        paddingHorizontal: 25,
        paddingVertical: 14,
        borderBottomColor: COLORS.lightGray1,
        borderBottomWidth: 0.5,
        backgroundColor: 'white',
        width: '100%',
        borderTopColor: COLORS.lightGray1,
        borderTopWidth: isFirst ? 0.5 : 0,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Text style={{ ...styles.light, flex: 1 }}>{date}</Text>
      </View>
      {subtitle && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}
        >
          <Text style={{ ...styles.heavy, flex: 1 }}>{subtitle}</Text>
          {subtitleTotal && <Text style={styles.light}>{subtitleTotal}</Text>}
        </View>
      )}
    </View>
  );
};

export type upcomingCardProps = {
  date: string;
  subtitle: string;
  onPress?: () => void;
  isFirst?: boolean;
};

const UpcomingCard = ({
  date,
  subtitle,
  onPress,
  isFirst,
}: upcomingCardProps) => {
  return (
    <View
      style={{
        paddingHorizontal: 25,
        paddingVertical: 14,
        borderBottomColor: COLORS.lightGray1,
        borderBottomWidth: 0.5,
        backgroundColor: 'white',
        width: '100%',
        borderTopColor: COLORS.lightGray1,
        borderTopWidth: isFirst ? 0.5 : 0,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
          paddingRight: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Text style={{ ...styles.heavy }}>{date}</Text>
          <Text style={{ ...styles.light, paddingTop: 10 }}>{subtitle}</Text>
        </View>

        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onPress}
        >
          <DeleteIcon width="24" height="24" fill="#8C9F97" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PageTitle: {},
  header: {
    color: '#234236',
    fontFamily: 'Ageo',
    fontSize: 24,
    lineHeight: 30,
  },
  heavy: {
    color: '#234236',
    fontFamily: 'PublicSans-SemiBold',
    fontSize: 12,
    // lineHeight: 16,
  },
  light: {
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

export default Deposits;

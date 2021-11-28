import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Layout from '../../components/common/Layout';
import { RootState } from '../../redux/store';
import { utils } from '../../utils';
import { COLORS } from '../../utils/constants';

const ManageRoundups = () => {
  const {
    upcoming,
    previous,
    nextPaymentDate,
    upcomingDepositTotal,
    allTimeTotal,
    earliestUpcomingPaymentDate,
  } = useSelector((state: RootState) => state.roundups.roundups);

  console.log({ upcoming });

  return (
    <Layout title="Manage Roundups">
      <FlatList
        data={[]}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Card
              title="Upcoming deposit total"
              titleTotal={`$${utils.formatMoney(upcomingDepositTotal, 2)}`}
            />
            <Card
              title="All time total"
              titleTotal={`$${utils.formatMoney(allTimeTotal, 2)}`}
            />
            <View
              style={{
                backgroundColor: '#F8F8F7',
                paddingHorizontal: 25,
                paddingVertical: 14,
              }}
            >
              <Text style={{ textAlign: 'left' }}>
                {moment(earliestUpcomingPaymentDate).format('MMMM Do, YYYY')} -{' '}
                {moment(nextPaymentDate).format('MMMM Do, YYYY')}
              </Text>
            </View>
            {upcoming && upcoming?.length > 0 && (
              <RoundupList list={upcoming} />
            )}
            <View
              style={{
                backgroundColor: '#F8F8F7',
                paddingHorizontal: 25,
                paddingVertical: 14,
              }}
            >
              <Text style={{ textAlign: 'left' }}>Past roundups </Text>
            </View>
            {previous && previous?.length > 0 && (
              <RoundupList list={previous} />
            )}
          </View>
        }
        renderItem={() => {
          return <View />;
        }}
        ListFooterComponent={<View style={{ height: 40 }} />}
      />
    </Layout>
  );
};

const RoundupList = ({ list }) => {
  return (
    <View>
      {list &&
        list.map((roundup) => (
          <Card
            key={roundup.transaction.transaction_id}
            title={roundup.transaction.name}
            titleTotal={`$${utils.formatMoney(
              Math.abs(roundup.transactionRoundupAmount),
              2
            )}`}
            subtitle={`$${utils.formatMoney(
              Math.abs(roundup.transactionAmount),
              2
            )} → $${utils.formatMoney(
              Math.abs(roundup.transactionAmount) +
                Math.abs(roundup.transactionRoundupAmount),
              2
            )}`}
            subtitleTotal={moment(roundup.transaction.date).format(
              'MMM Do, YYYY'
            )}
          />
        ))}
    </View>
  );
};

export default ManageRoundups;

export type CardProps = {
  title: string;
  titleTotal: string;
  subtitle?: string;
  subtitleTotal?: string;
};

const Card = ({ title, titleTotal, subtitle, subtitleTotal }: CardProps) => {
  return (
    <View
      style={{
        paddingHorizontal: 25,
        paddingVertical: 14,
        borderBottomColor: COLORS.lightGray1,
        borderBottomWidth: 0.5,
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Text style={{ ...styles.title, flex: 1 }}>{title}</Text>

        <Text style={styles.subtitle}>{titleTotal}</Text>
      </View>
      {subtitle && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}
        >
          <Text style={{ ...styles.subtitle, flex: 1 }}>{subtitle}</Text>
          {subtitleTotal && (
            <Text style={styles.subtitle}>{subtitleTotal}</Text>
          )}
        </View>
      )}
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

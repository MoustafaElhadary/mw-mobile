import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { ArrowBackIcon } from '../../components/common/icons';
import { RootState } from '../../redux/store';
import { utils } from '../../utils';
import { COLORS } from '../../utils/constants';

const ManageRoundups = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const roundups = useSelector((state: RootState) => state.roundups.roundups);
  const upcoming = roundups.upcoming;
  const previous = roundups.previous;
  console.log({ upcoming });

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
        backgroundColor: '#fff',
      }}
    >
      {/* Title */}
      <View
        style={{
          marginTop: 16,
          borderBottomColor: COLORS.lightGray1,
          borderBottomWidth: 0.5,
          backgroundColor: '#fff',
          flexDirection: 'row',
          paddingBottom: 16,
        }}
      >
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowBackIcon
              style={{ zIndex: 1 }}
              width="36"
              height="36"
              fill="#234236"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              ...styles.header,
            }}
          >
            Roundup history
          </Text>
        </View>
      </View>
      <FlatList
        data={[]}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Card
              title="Upcoming deposit total"
              tileTotal={`$${utils.formatMoney(
                Math.abs(
                  upcoming?.reduce(
                    (acc, curr) => acc + curr.transactionRoundupAmount,
                    0
                  )
                ),
                2
              )}`}
            />
            <Card
              title="All time total"
              tileTotal={`$${utils.formatMoney(
                Math.abs(
                  upcoming?.reduce(
                    (acc, curr) => acc + curr.transactionRoundupAmount,
                    0
                  ) +
                    previous?.reduce(
                      (acc, curr) => acc + curr.transactionRoundupAmount,
                      0
                    )
                ),
                2
              )}`}
            />
            <View
              style={{
                backgroundColor: '#F8F8F7',
                paddingHorizontal: 25,
                paddingVertical: 14,
              }}
            >
              <Text style={{ textAlign: 'left' }}>
                {moment(upcoming?.slice(-1)[0].transaction.date).format(
                  'MMMM Do, YYYY'
                )}{' '}
                - {utils.getNextMonday()}
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
    </View>
  );
};

const RoundupList = ({list}) => {
  return (
    <View>
      {list && list.map((roundup) => (
        <Card
          key={roundup.id}
          title={roundup.transaction.name}
          tileTotal={`$${utils.formatMoney(
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
  tileTotal: string;
  subtitle?: string;
  subtitleTotal?: string;
};

const Card = ({ title, tileTotal, subtitle, subtitleTotal }: CardProps) => {
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

        <Text style={styles.subtitle}>{tileTotal}</Text>
      </View>
      {subtitle && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}
        >
          <Text style={{ ...styles.subtitle, flex: 1 }}>
            {/* $3.96 → $4.00 */}
            {subtitle}
          </Text>
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

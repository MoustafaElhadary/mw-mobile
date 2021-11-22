import React from 'react';
import {
  FlatList, StyleSheet, Text, View
} from 'react-native';
import LiabilityCard from '../../components/LiabilityCard';
import { dummyData, SIZES } from '../../utils/constants';

const Home = () => {

  const loans = [
    {
      id: 1,
      type: 'Student',
      amount: '$16,000',
      apr: '10%',
    },
    {
      id: 2,
      type: 'Mortgage',
      amount: '$100,000',
      apr: '4%',
    }
  ]

  function renderRecommendedSection() {
    return (
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={loans}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <LiabilityCard
              item={item}
              onPress={() => console.log('LiabilityCard')}
              first={index == 0}
              last={index == loans.length - 1}
            />
          )}
        />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F8F8F7'
      }}
    >
      {/* List */}
      <FlatList
        data={[]}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 40,
                borderBottomColor: '#F0EEEE',
                borderBottomWidth: 1,
              }}
            >
              <Text style={styles.header}> Total loan amount</Text>
              <Text style={{ ...styles.content, paddingBottom: 16 }}>
                {' '}
                $16,839
              </Text>

              <Text style={styles.header}> Amount paid</Text>
              <Text style={{ ...styles.content, paddingBottom: 16 }}>
                {' '}
                $16,839
              </Text>

              <Text style={styles.header}> Amount left</Text>
              <Text style={{ ...styles.content, paddingBottom: 16 }}>
                {' '}
                $16,839
              </Text>

              <Text style={styles.header}> Savings</Text>
              <Text style={styles.content}> 💰 $16,839</Text>
              <Text style={styles.content}> 🕐 $16,839</Text>
            </View>

            {/* Recommended */}
            {renderRecommendedSection()}
          </View>
        }
        renderItem={() => {
          return <View />;
        }}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    color: '#234236',
    fontFamily: 'Ageo',
    fontSize: 22,
    lineHeight: 32,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  content: {
    color: '#398E71',
    fontFamily: 'Ageo',
    fontSize: 26,
    lineHeight: 32,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});

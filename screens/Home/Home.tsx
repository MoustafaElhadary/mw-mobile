import axios from 'axios';
import Constants from 'expo-constants';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import LiabilityCard from '../../components/LiabilityCard';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import { utils } from '../../utils';
import { COLORS } from '../../utils/constants';

const Home = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [data, setData] = useState(null);

  const fetchLoans = async () => {
    const mwAccessToken = await user.getIdToken();
    axios
      .post(`${Constants.manifest.extra.apiUrl}/loans`, {
        mwAccessToken,
      })
      .then(async (response) => {
        setData(response.data);
      });
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const loans = [];

  if (data) {
    if (data?.student.balance > 0) {
      loans.push({
        id: '1',
        type: 'Student',
        amount: utils.formatMoney(data?.student.balance, 2),
        apr: data?.student.averageInterestRate,
      });
    }
  }

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
        backgroundColor: '#F8F8F7',
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
            
              <Text style={styles.header}> Amount paid with MochaWallet</Text>
              <Text style={{ ...styles.content, paddingBottom: 16 }}>
                $16,839
              </Text>

              <Text style={styles.header}> Amount left</Text>
              <Text style={{ ...styles.content, paddingBottom: 16 }}>
                {utils.formatMoney(data?.amountLeft || 0, 2)}
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
    color: COLORS.primary,
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

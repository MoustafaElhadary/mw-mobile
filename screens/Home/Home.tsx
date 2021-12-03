import axios from 'axios';
import Constants from 'expo-constants';
import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LiabilityCard from '../../components/LiabilityCard';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import { RootState } from '../../redux/store';
import { setStudentLoan } from '../../redux/userSlice';
import { utils } from '../../utils';
import { COLORS } from '../../utils/constants';

const Home = () => {
  const dispatch = useDispatch();

  const { user } = useContext(AuthenticatedUserContext);
  const studentLoan = useSelector((state: RootState) => state.user.studentLoan);

  const fetchLoans = async () => {
    const mwAccessToken = await user.getIdToken();
    axios
      .post(`${Constants.manifest.extra.apiUrl}/loans`, {
        mwAccessToken,
      })
      .then(async (response) => {
        dispatch(setStudentLoan(response.data));
      });
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  console.log({ studentLoan });

  function renderStudentLoanSection() {
    return (
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={[]}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <LiabilityCard
              item={{
                apr: studentLoan?.interest?.apr,
                type: 'Student',
                amount: studentLoan?.balance,
                id: 'studentLoan',
              }}
              onPress={() => console.log('LiabilityCard')}
              first={true}
              last={true}
            />
          }
          renderItem={() => <View />}
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
                ${utils.formatMoney(studentLoan?.balance)}
              </Text>

              <Text style={styles.header}> Savings</Text>
              <Text style={styles.content}>
                {' '}
                💰 ${utils.formatMoney(studentLoan?.interest?.interestSavings)}
              </Text>
              <Text style={styles.content}>
                {' '}
                🕐 {studentLoan?.interest?.timeSavedString}
              </Text>
            </View>

            {/* Recommended */}
            {renderStudentLoanSection()}
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

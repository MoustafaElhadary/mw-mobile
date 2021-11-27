import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ArrowForwardIcon } from '../../components/common/icons';
import Layout from '../../components/common/Layout';
import { RootState } from '../../redux/store';
import { COLORS } from '../../utils/constants';

const Profile = () => {
  const { profile } = useSelector((state: RootState) => state.user);

  return (
    <Layout
      title="Account"
      containerStyle={{
        backgroundColor: '#F8F8F7',
      }}
    >
      <View
        style={{
          backgroundColor: '#F8F8F7',
          paddingHorizontal: 25,
          paddingVertical: 14,
          borderBottomColor: COLORS.lightGray1,
          borderBottomWidth: 0.3,
        }}
      >
        <Text
          style={{
            textAlign: 'left',
            color: '#8C9F97',
            fontFamily: 'PublicSans-SemiBold',
            fontSize: 12,
            lineHeight: 16,
          }}
        >
          Account
        </Text>
      </View>
      <Card field="First Name" value={profile.firstName} />
      <Card field="Last Name" value={profile.lastName} />
      <Card field="Email" value={profile.email} />
      <View
        style={{
          backgroundColor: '#F8F8F7',
          paddingHorizontal: 25,
          paddingVertical: 14,
          borderBottomColor: COLORS.lightGray1,
          borderBottomWidth: 0.3,
        }}
      >
        <Text
          style={{
            textAlign: 'left',
            color: '#8C9F97',
            fontFamily: 'PublicSans-SemiBold',
            fontSize: 12,
            lineHeight: 16,
          }}
        >
          Personal
        </Text>
      </View>
      <Card field="Phone" value={profile.phone} />
      <Card field="Address" value={profile.address} />
      <TouchableOpacity
        style={{
          marginTop: 40,
          paddingHorizontal: 25,
          paddingVertical: 14,
          borderBottomColor: COLORS.lightGray1,
          borderBottomWidth: 0.5,
          borderTopColor: COLORS.lightGray1,
          borderTopWidth: 0.5,
          backgroundColor: 'white',
          width: '100%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ ...styles.subtitle, flex: 1, color: '#FF3D71' }}>
            Deactivate account
          </Text>
          <ArrowForwardIcon
            style={{ marginLeft: 10 }}
            width="24"
            height="24"
            fill="#70706F"
          />
        </View>
      </TouchableOpacity>
    </Layout>
  );
};

export type CardProps = {
  field: string;
  value: string;
  onPress?: () => void;
};
const Card = ({ field, value, onPress }: CardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress || (() => {})}
      disabled={!onPress}
      style={{
        paddingHorizontal: 25,
        paddingVertical: 14,
        borderBottomColor: COLORS.lightGray1,
        borderBottomWidth: 0.5,
        backgroundColor: 'white',
        width: '100%',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ ...styles.subtitle, flex: 1 }}>{field}</Text>

        <Text style={styles.field}>{value}</Text>
        {/* <EditIcon
          style={{ marginLeft: 10 }}
          width="24"
          height="24"
          fill="#70706F"
        /> */}
      </View>
    </TouchableOpacity>
  );
};
export default Profile;

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
  field: {
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
});

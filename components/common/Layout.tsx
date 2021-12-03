import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowBackIcon } from '../../components/common/icons';
import { COLORS } from '../../utils/constants';

export type LayoutProps = {
  title: string;
  children: JSX.Element | JSX.Element[];
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
};
const Layout = ({
  children,
  title,
  containerStyle,
  headerStyle,
}: LayoutProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const windowWidth = useWindowDimensions().width;
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
        backgroundColor: '#fff',
        ...headerStyle,
      }}
    >
      {/* Title */}
      <View
        style={{
          paddingTop: 16,
          borderBottomColor: COLORS.lightGray1,
          borderBottomWidth: 0.5,
          backgroundColor: '#fff',
          flexDirection: 'row',
          paddingBottom: 16,
          ...headerStyle,
        }}
      >
        <View style={{ marginLeft: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowBackIcon
              style={{ zIndex: 1 }}
              width="36"
              height="36"
              fill={COLORS.primary}
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
              marginLeft: -16,
              ...styles.header,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          ...containerStyle,
        }}
      >
        <FlatList
          data={[]}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ width: windowWidth }}>{children}</View>
          }
          renderItem={() => {
            return <View />;
          }}
          ListFooterComponent={<View style={{ height: 40 }} />}
        />
      </View>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  header: {
    color: COLORS.primary,
    fontFamily: 'Ageo',
    fontSize: 24,
    lineHeight: 30,
  },
});

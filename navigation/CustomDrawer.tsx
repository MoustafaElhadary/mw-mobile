import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createDrawerNavigator,
  DrawerContentScrollView
} from '@react-navigation/drawer';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import axios from 'axios';
import Constants from 'expo-constants';
import React, { useContext, useEffect } from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Linking,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { BookOpenIcon } from 'react-native-heroicons/outline';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityOutlineIcon, LockIcon } from '../components/common/icons';
import { setRegistered } from '../redux/registrationSlice';
import { RootState } from '../redux/store';
import { setInitialUser } from '../redux/userSlice';
import MainLayout from '../screens/MainLayout';
import { COLORS, FONTS, icons, SIZES } from '../utils/constants';
import Firebase from '../utils/firebase';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';

const auth = Firebase.auth();

const Drawer = createDrawerNavigator();
type Props = {
  navigation: DrawerNavigationHelpers;
};

export type CustomDrawerItemProps = {
  label: string;
  image?: ImageSourcePropType;
  icon?: JSX.Element;
  isFocused?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

const CustomDrawerItem = ({
  label,
  image,
  isFocused,
  onPress,
  icon,
}: CustomDrawerItemProps) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 40,
        marginBottom: SIZES.base,
        alignItems: 'center',
        paddingLeft: SIZES.radius,
        borderRadius: SIZES.base,
        backgroundColor: isFocused ? COLORS.transparentBlack1 : null,
      }}
      onPress={onPress}
    >
      {image && (
        <Image
          source={image}
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.white,
          }}
        />
      )}
      {icon && icon}
      <Text
        style={{
          marginLeft: 15,
          color: COLORS.white,
          ...FONTS.h3,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const { user: authUser } = useContext(AuthenticatedUserContext);
  const user = useSelector((state: RootState) => state.user);

  const fetchMyAccount = async () => {
    const mwAccessToken = await authUser.getIdToken();
    axios
      .post(`${Constants.manifest.extra.apiUrl}/me`, {
        mwAccessToken,
      })
      .then(async (response) => {
        dispatch(setInitialUser(response.data));
      });
  };

  useEffect(() => {
    fetchMyAccount();
  }, []);

  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.radius,
        }}
      >
        {/* Close */}
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.closeDrawer()}
          >
            <Image
              source={icons.cross}
              style={{
                height: 35,
                width: 35,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Profile')}
        >
          <View
            style={{
              marginLeft: SIZES.radius,
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              {user.profile?.firstName} {user.profile?.lastName}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
              View your profile
            </Text>
          </View>
        </TouchableOpacity>

        {/* Drawer Items */}
        <View
          style={{
            flex: 1,
            marginTop: SIZES.padding,
          }}
        >
          {/* <CustomDrawerItem label="Track Your Order" icon={icons.location} />

          <CustomDrawerItem label="Coupons" icon={icons.coupon} /> */}
          <CustomDrawerItem
            label="Financial Accounts"
            icon={<ActivityOutlineIcon width="24" height="24" fill="#fff" />}
            onPress={() => navigation.navigate('FinancialAccounts')}
          />

          <View
            style={{
              height: 1,
              marginVertical: SIZES.height > 800 ? SIZES.radius : 0,
              marginLeft: SIZES.radius,
              backgroundColor: COLORS.lightGray1,
            }}
          />

          <CustomDrawerItem
            label="Privacy Policy"
            icon={<LockIcon width="24" height="24" fill="#fff" />}
            onPress={() =>
              navigation.navigate('CustomWebview', {
                uri: 'https://mochawallet.webflow.io/',
                title: 'Privacy Policy',
              })
            }
          />

          <CustomDrawerItem
            label="Terms of use"
            icon={<BookOpenIcon width="24" height="24" stroke="#fff" />}
            onPress={() =>
              navigation.navigate('CustomWebview', {
                uri: 'https://mochawallet.webflow.io/',
                title: 'Terms of use',
              })
            }
          />

          <CustomDrawerItem
            label="Help"
            image={icons.help}
            onPress={() =>
              Linking.openURL(
                'mailto:support@mochawallet.com?subject=Need help with app&body=Hello, I need help with app'
              )
            }
          />
        </View>

        <View
          style={{
            marginBottom: SIZES.padding,
          }}
        >
          <CustomDrawerItem
            label="Logout"
            image={icons.logout}
            onPress={async () => {
              await auth.signOut();
              dispatch(setRegistered(false));
              await AsyncStorage.removeItem('@registered');
            }}
          />
          <Text
            style={{
              paddingLeft: SIZES.radius,
              color: COLORS.white,
            }}
          >
            Version {Constants.manifest.version}
          </Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawer = () => {
  const [progress, setProgress] = React.useState<Animated.Node<number>>(
    new Animated.Value(0)
  );

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={{
          flex: 1,
          width: '65%',
          paddingRight: 20,
          backgroundColor: 'transparent',
        }}
        sceneContainerStyle={{
          backgroundColor: 'transparent',
        }}
        initialRouteName="MainLayout"
        drawerContent={(props) => {
          setTimeout(() => {
            setProgress(props.progress);
          }, 0);

          return <CustomDrawerContent navigation={props.navigation} />;
        }}
      >
        <Drawer.Screen name="MainLayout">
          {(props) => (
            <MainLayout {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawer;

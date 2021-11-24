import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createDrawerNavigator,
  DrawerContentScrollView
} from '@react-navigation/drawer';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import firebase from 'firebase';
import React, { useContext, useEffect } from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { setRegistered } from '../redux/registrationSlice';
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
  icon: ImageSourcePropType;
  isFocused?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

const CustomDrawerItem = ({
  label,
  icon,
  isFocused,
  onPress,
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
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.white,
        }}
      />

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

  const { user } = useContext(AuthenticatedUserContext);
  const [data, setData] = React.useState(null);

  
  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log({ doc: doc.data() });
          setData(doc.data());
        }
      });
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
          onPress={() => console.log('Profile')}
        >
          <View
            style={{
              marginLeft: SIZES.radius,
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              {data?.firstName} {data?.lastName}
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

          <CustomDrawerItem label="Settings" icon={icons.setting} />

          <CustomDrawerItem label="Invite a Friend" icon={icons.profile} />

          <CustomDrawerItem label="Help Center" icon={icons.help} />
        </View>

        <View
          style={{
            marginBottom: SIZES.padding,
          }}
        >
          <CustomDrawerItem
            label="Logout"
            icon={icons.logout}
            onPress={async () => {
              await auth.signOut();
              dispatch(setRegistered(false));
              await AsyncStorage.removeItem('@registered');
            }}
          />
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

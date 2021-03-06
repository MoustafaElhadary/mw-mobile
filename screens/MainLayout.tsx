import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {
  ChartBarIcon,
  CreditCardIcon,
  HomeIcon
} from 'react-native-heroicons/outline';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { RootState } from '../redux/store';
import { setSelectedTab } from '../redux/tabSlice';
import { COLORS, constants, FONTS, icons, SIZES } from '../utils/constants';
import Firebase from '../utils/firebase';
import Deposits from './Deposits/Deposits';
import Funding from './Funding/Funding';
import Home from './Home/Home';

const auth = Firebase.auth();

const TabButton = ({
  label,
  icon,
  isFocused,
  outerContainerStyle,
  innerContainerStyle,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
          outerContainerStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              width: '80%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
            },
            innerContainerStyle,
          ]}
        >
          {icon}

          {isFocused && (
            <Text
              numberOfLines={1}
              style={{
                marginLeft: SIZES.base,
                color: COLORS.white,
                ...FONTS.h3,
              }}
            >
              {label}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const MainLayout = ({ drawerAnimationStyle, navigation }) => {
  const flatListRef = React.useRef<
    FlatList<{
      id: number;
      label: string;
    }>
  >();

  const selectedTab = useSelector((state: RootState) => state.ui.selectedTab);
  const dispatch = useDispatch();
  // Reanimated Shared Value

  const homeTabFlex = useSharedValue(1);
  const homeTabColor = useSharedValue<string | number>(COLORS.primary);
  const depositsTabFlex = useSharedValue(1);
  const depositsTabColor = useSharedValue<string | number>(COLORS.primary);
  const FundingTabFlex = useSharedValue(1);
  const FundingTabColor = useSharedValue<string | number>(COLORS.primary);
  const profileTabFlex = useSharedValue(1);
  const profileTabColor = useSharedValue<string | number>(COLORS.primary);

  // Reanimated Animated Style

  const homeFlexStyle = useAnimatedStyle(() => {
    return {
      flex: homeTabFlex.value,
    };
  });

  const homeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: homeTabColor.value,
    };
  });

  const depositsFlexStyle = useAnimatedStyle(() => {
    return {
      flex: depositsTabFlex.value,
    };
  });

  const depositsColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: depositsTabColor.value,
    };
  });

  const FundingFlexStyle = useAnimatedStyle(() => {
    return {
      flex: FundingTabFlex.value,
    };
  });

  const FundingColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: FundingTabColor.value,
    };
  });

  const profileFlexStyle = useAnimatedStyle(() => {
    return {
      flex: profileTabFlex.value,
    };
  });

  const profileColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: profileTabColor.value,
    };
  });

  React.useEffect(() => {
    dispatch(setSelectedTab(constants.screens.home));
  }, []);

  React.useEffect(() => {
    if (selectedTab == constants.screens.home) {
      flatListRef?.current?.scrollToIndex({
        index: 0,
        animated: false,
      });

      homeTabFlex.value = withTiming(4, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      homeTabFlex.value = withTiming(1, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab == constants.screens.deposits) {
      flatListRef?.current?.scrollToIndex({
        index: 1,
        animated: false,
      });

      depositsTabFlex.value = withTiming(4, { duration: 500 });
      depositsTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
      });
    } else {
      depositsTabFlex.value = withTiming(1, { duration: 500 });
      depositsTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab == constants.screens.funding) {
      flatListRef?.current?.scrollToIndex({
        index: 2,
        animated: false,
      });

      FundingTabFlex.value = withTiming(4, { duration: 500 });
      FundingTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      FundingTabFlex.value = withTiming(1, { duration: 500 });
      FundingTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab == constants.screens.profile) {
      flatListRef?.current?.scrollToIndex({
        index: 3,
        animated: false,
      });

      profileTabFlex.value = withTiming(4, { duration: 500 });
      profileTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      profileTabFlex.value = withTiming(1, { duration: 500 });
      profileTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }
  }, [selectedTab]);

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        ...drawerAnimationStyle,
      }}
    >
      {/* Header */}
      <Header
        containerStyle={{
          height: 50,
          paddingHorizontal: SIZES.padding,
          marginTop: 40,
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
        title={selectedTab.toUpperCase()}
        leftComponent={
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.openDrawer()}
          >
            <Image source={icons.menu} />
          </TouchableOpacity>
        }
      />

      {/* Content */}
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: SIZES.height,
                  width: SIZES.width,
                }}
              >
                {item.label == constants.screens.home && <Home />}
                {item.label == constants.screens.deposits && <Deposits />}
                {item.label == constants.screens.funding && <Funding />}
                {/* {item.label == constants.screens.profile && <Profile />} */}
              </View>
            );
          }}
        />
      </View>

      {/* Footer */}
      <View
        style={{
          height: 100,
          justifyContent: 'flex-end',
        }}
      >
        {/* Shadow */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
          colors={[COLORS.transparent, COLORS.lightGray1]}
          style={{
            position: 'absolute',
            top: -20,
            left: 0,
            right: 0,
            height: 100,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />

        {/* Tabs */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            paddingBottom: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.white,
          }}
        >
          <TabButton
            label={constants.screens.home}
            icon={
              <HomeIcon
                color={
                  selectedTab == constants.screens.home
                    ? COLORS.white
                    : COLORS.gray
                }
                size={24}
              />
            }
            isFocused={selectedTab == constants.screens.home}
            outerContainerStyle={homeFlexStyle}
            innerContainerStyle={homeColorStyle}
            onPress={() => dispatch(setSelectedTab(constants.screens.home))}
          />

          <TabButton
            label={constants.screens.deposits}
            icon={
              <ChartBarIcon
                color={
                  selectedTab == constants.screens.deposits
                    ? COLORS.white
                    : COLORS.gray
                }
                size={24}
              />
            }
            isFocused={selectedTab == constants.screens.deposits}
            outerContainerStyle={depositsFlexStyle}
            innerContainerStyle={depositsColorStyle}
            onPress={() => dispatch(setSelectedTab(constants.screens.deposits))}
          />

          <TabButton
            label={constants.screens.funding}
            icon={
              <CreditCardIcon
                color={
                  selectedTab == constants.screens.funding
                    ? COLORS.white
                    : COLORS.gray
                }
                size={24}
              />
            }
            isFocused={selectedTab == constants.screens.funding}
            outerContainerStyle={FundingFlexStyle}
            innerContainerStyle={FundingColorStyle}
            onPress={() => dispatch(setSelectedTab(constants.screens.funding))}
          />

          {/* <TabButton
            label={constants.screens.profile}
            icon={
              <UserIcon
                color={
                  selectedTab == constants.screens.profile
                    ? COLORS.white
                    : COLORS.gray
                }
                size={24}
              />
            }
            isFocused={selectedTab == constants.screens.profile}
            outerContainerStyle={profileFlexStyle}
            innerContainerStyle={profileColorStyle}
            onPress={() => dispatch(setSelectedTab(constants.screens.profile))}
          /> */}
        </View>
      </View>
    </Animated.View>
  );
};

export default MainLayout;

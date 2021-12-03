import React from 'react';
import { Animated, FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextButton from '../../components/TextButton';
import { COLORS, constants, FONTS, SIZES } from '../../utils/constants';

const OnBoarding = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef<
    FlatList<{
      id: number;
      backgroundImage: string;
      bannerImage: string;
      title: string;
      description: string;
    }>
  >();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const onViewChangeRef = React.useRef(({ viewableItems, changed }) => {
    setCurrentIndex(viewableItems[0].index);
  });

  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {constants.onboarding_screens.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [
              COLORS.transparentBlack1,
              COLORS.primary,
              COLORS.transparentBlack1,
            ],
            extrapolate: 'clamp',
          });

          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 30, 10],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 6,
                width: dotWidth,
                height: 10,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };

  function renderHeaderLogo() {
    return (
      <View
        style={{
          alignItems: 'center',
          paddingLeft: 20,

        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            fontFamily: 'Ageo',
            fontSize: 30,
            lineHeight: 40,
            fontStyle: 'normal',
            fontWeight: 'bold',
            textAlign: 'left',
            width: '100%',
            marginLeft: 21,
            paddingTop: 10,
          }}
        >
          MochaWallet
        </Text>
        <Text
          style={{
            color: '#398E71',
            fontFamily: 'Ageo',
            fontSize: 24,
            lineHeight: 30,
            fontStyle: 'normal',
            fontWeight: 'bold',
            textAlign: 'left',
            width: '100%',
            marginLeft: 21,
          }}
        >
          Get out of debt fast.
        </Text>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          height: 160,
        }}
      >
        {/* Pagination / Dots */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Dots />
        </View>

        {/* Buttons */}
        {currentIndex < constants.onboarding_screens.length - 1 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
            }}
          >
            <TextButton
              label="Skip"
              buttonContainerStyle={{
                backgroundColor: null,
              }}
              labelStyle={{
                color: COLORS.darkGray2,
              }}
              onPress={() => navigation.replace('SignUp')}
            />

            <TextButton
              label="Next"
              buttonContainerStyle={{
                height: 60,
                width: 200,
                borderRadius: SIZES.radius,
              }}
              onPress={() => {
                flatListRef?.current?.scrollToIndex({
                  index: currentIndex + 1,
                  animated: true,
                });
              }}
            />
          </View>
        )}

        {currentIndex == constants.onboarding_screens.length - 1 && (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
            }}
          >
            <TextButton
              label="Let's Get Started"
              buttonContainerStyle={{
                height: 60,
                borderRadius: SIZES.radius,
              }}
              onPress={() => navigation.replace('SignUp')}
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        // paddingBottom: insets.bottom,
        paddingTop: insets.top,
      }}
    >
      {renderHeaderLogo()}
      {/* Header */}
      <View
        style={{
          flex: 3,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
            width: '100%',
          }}
        >
          <Image
            source={require('../../assets/images/mouth.png')}
            resizeMode="contain"
            style={{
              width: SIZES.width,
              height: SIZES.width,
              marginBottom: -SIZES.padding,
            }}
          />
        </View>
      </View>
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={constants.onboarding_screens}
        scrollEventThrottle={16}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewChangeRef.current}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: SIZES.width,
              }}
            >
              {/* Detail */}
              <View
                style={{
                  flex: 1,
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingHorizontal: SIZES.radius,
                }}
              >
                <Text style={{ ...FONTS.h1, fontSize: 25 }}>{item.title}</Text>
                <Text
                  style={{
                    marginTop: SIZES.radius,
                    textAlign: 'center',
                    color: COLORS.darkGray,
                    paddingHorizontal: SIZES.padding,
                    ...FONTS.body3,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {renderFooter()}
    </View>
  );
};

export default OnBoarding;

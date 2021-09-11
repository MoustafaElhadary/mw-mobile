import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Post } from '../types';
import { COLORS, FONTS, icons, SIZES } from '../utils/constants';

export type PostCardType = {
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  item: Post;
  onPress: (event: GestureResponderEvent) => void;
};

const PostCard = ({
  containerStyle,
  imageStyle,
  item,
  onPress,
}: PostCardType) => {
  console.log({ uri: item.user.userImage });
  return (
    <View
      style={{
        flexDirection: 'column',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        // alignItems: 'center',
        marginHorizontal: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        marginBottom: SIZES.radius,
        ...containerStyle,
      }}
    >
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={{ uri: item.user.userImage }}
              style={{
                height: 40,
                width: 40,
                borderRadius: SIZES.radius,
                ...imageStyle,
              }}
            />
          </TouchableOpacity>

          {/* Name and Date */}
          <View style={{ marginLeft: 10, flexDirection: 'column' }}>
            <Text
              style={{ ...FONTS.h3, color: COLORS.darkGray2, fontSize: 14 }}
            >
              {item.user.username}
            </Text>
            <Text
              style={{ ...FONTS.h4, color: COLORS.darkGray2, fontSize: 10 }}
            >
              2h ago
            </Text>
          </View>
        </View>
        {/* Image */}

        {/* Streak */}
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Image
            source={icons.calories}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <Text style={{ ...FONTS.body5, color: COLORS.darkGray2 }}>
            {item.user.userKarma}
          </Text>
        </View>
      </View>
      <Text style={{ marginTop: SIZES.base, ...FONTS.h3 }}>
        {item.postText}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{ alignSelf: 'center', paddingVertical: 15 }}
      >
        <Text> ✈️ Message </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostCard;

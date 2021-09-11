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
        alignItems: 'center',
        marginHorizontal: SIZES.padding,
        marginBottom: SIZES.radius,
        ...containerStyle,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          height: 150,
          alignItems: 'center',
        }}
        onPress={onPress}
      >
        {/* Image */}
        <Image
          source={{ uri: item.user.userImage }}
          style={{
            marginTop: -65,
            marginLeft: 15,
            marginRight: 15,
            height: 40,
            width: 40,
            borderRadius: SIZES.radius,
            ...imageStyle,
          }}
        />
        {/* Info */}
        <View
          style={{
            flex: 1,
            marginTop: -40,
          }}
        >
          {/* Name */}
          <Text style={{ ...FONTS.h3, color: COLORS.darkGray2, fontSize: 14 }}>
            {item.user.username}
          </Text>
          <Text style={{ ...FONTS.h4, color: COLORS.darkGray2, fontSize: 10 }}>
            2h ago
          </Text>
          <Text style={{ marginTop: SIZES.base, ...FONTS.h3 }}>
            {item.postText}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 5,
            right: SIZES.radius,
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
      </TouchableOpacity>
      <Text>Message </Text>
    </View>
  );
};

export default PostCard;

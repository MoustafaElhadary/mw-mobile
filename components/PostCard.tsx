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
        flexDirection: 'row',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        // alignItems: 'center',
        marginHorizontal: SIZES.padding,
        padding: SIZES.padding,
        marginBottom: SIZES.radius,
      }}
    >
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

      {/* name date */}
      {/* Text */}
      <View style={{ flexDirection: 'column', marginLeft: 15 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray2,
              fontSize: 14,
              marginRight: 5,
            }}
          >
            {item.user.username}
          </Text>
          <Text style={{ ...FONTS.h4, color: COLORS.darkGray2, fontSize: 10 }}>
            {item.date.toDateString()}
          </Text>
        </View>
        <Text style={{ marginRight: 25, ...FONTS.h3 }}>{item.postText}</Text>
      </View>
      {/* button */}
    </View>

    // <View
    //   style={{
    //     flexDirection: 'column',
    //     borderRadius: SIZES.radius,
    //     backgroundColor: COLORS.lightGray2,
    //     // alignItems: 'center',
    //     marginHorizontal: SIZES.padding,
    //     paddingHorizontal: SIZES.padding,
    //     marginBottom: SIZES.radius,
    //     ...containerStyle,
    //   }}
    // >

    //   <View
    //     style={{
    //       marginTop: 20,
    //       flexDirection: 'column',
    //       justifyContent: 'space-between',
    //     }}
    //   >
    //     <View style={{ flexDirection: 'column' }}>

    //       {/* Name and Date */}
    //       <View style={{flexDirection: 'row' }}>
    //         <Text
    //           style={{ ...FONTS.h3, color: COLORS.darkGray2, fontSize: 14, marginRight: 5 }}
    //         >
    //           {item.user.username}
    //         </Text>
    //         <Text
    //           style={{ ...FONTS.h4, color: COLORS.darkGray2, fontSize: 10 }}
    //         >
    //           2h ago
    //         </Text>
    //       </View>
    //     </View>
    //     {/* Image */}

    //  <Text style={{ marginTop: SIZES.base, ...FONTS.h3 }}>
    //     {item.postText}
    //   </Text>
    //   </View>

    //   <TouchableOpacity
    //     onPress={onPress}
    //     style={{ alignSelf: 'center', paddingVertical: 15 }}
    //   >
    //     <Text> 💬 Message </Text>
    //   </TouchableOpacity>
    // </View>
  );
};

export default PostCard;

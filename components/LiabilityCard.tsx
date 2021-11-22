import React from 'react';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/constants';

export type HorizontalFoodCardType = {
  first: boolean;
  last: boolean;
  item: any;
  onPress: (event: GestureResponderEvent) => void;
};

const LiabilityCard = ({ item, onPress, first, last }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        marginLeft: first ? SIZES.padding : 18,
        marginRight: last ? SIZES.padding : 0,
        padding: SIZES.radius * 2,

        alignItems: 'center',
      }}
      onPress={onPress}
    >
      {/* Info */}
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 0.8,
        }}
      >
        {/* Price */}
        <Text
          style={{
            color: '#FC9F5B',
            fontFamily: 'Poppins-Regular',
            fontSize: 26,
            lineHeight: 32,
            fontStyle: 'normal',
            fontWeight: '400',

          marginBottom: SIZES.padding * 0.4,
          }}
        >
          {item.amount}
        </Text>
        <Text
          style={{
            color: '#8C9F97',
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            lineHeight: 16,
            fontStyle: 'normal',
            fontWeight: '400',
          }}
        >
          Average APR: {item.apr}
        </Text>
      </View>

      {/* Calories */}
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 10,
          left: 20,
          right: SIZES.radius,
        }}
      >
        <Text style={{ ...FONTS.body5, color: COLORS.darkGray2 }}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LiabilityCard;

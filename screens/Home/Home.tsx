import React from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FilterModal from '../../components/FilterModal';
import PostCard from '../../components/PostCard';
import { COLORS, dummyData, FONTS, icons, SIZES } from '../../utils/constants';

const Home = () => {
  const [postList, setPostList] = React.useState(dummyData.posts);

  const [showFilterModal, setShowFilterModal] = React.useState(false);

  // Render

  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        {/* Icon */}
        <Image
          source={icons.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }}
        />

        {/* Text Input */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
          }}
          placeholder="search..."
        />

        {/* Filter Button */}
        {/* <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Image
            source={icons.filter}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity> */}
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Search */}
      {renderSearch()}

      {/* Filter */}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {/* List */}
      <FlatList
        data={postList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View>{}</View>}
        renderItem={({ item, index }) => {
          return (
            <PostCard
              key={`${index} - post - card - ${item.id}`}
              item={item}
              onPress={() => console.log('HorizontalFoodCard')}
            />
          );
        }}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 30,
          right: 10,
          height: 70,
          backgroundColor: '#fff',
          borderRadius: 100,
        }}
      >
        {/* <Icon name="plus" size={30} color="#01a699" /> */}
        <Image
          style={{ width: 50, height: 50, resizeMode: 'contain' }}
          source={ dummyData.myProfile?.profile_image }
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

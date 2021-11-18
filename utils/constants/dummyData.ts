import { Post } from '../../types';

const myProfile = {
  name: 'Moustafa Elhadary',
  profile_image: require('../../assets/images/profile.jpeg'),
  address: '2771 Oakbrook Manor, Weston, FL, 33332',
};

const categories = [
  {
    id: 1,
    name: 'Fast Food',
    icon: require('../../assets/icons/burger.png'),
  },
  {
    id: 2,
    name: 'Fruit Item',
    icon: require('../../assets/icons/cherry.png'),
  },
  {
    id: 3,
    name: 'Rice Item',
    icon: require('../../assets/icons/rice.png'),
  },
];

const hamburger = {
  id: 1,
  name: 'Hamburger',
  description: 'Chicken patty hamburger',
  categories: [1, 2],
  price: 15.99,
  calories: 78,
  isFavorite: true,
  image: require('../../assets/dummyData/hamburger.png'),
};

const hotTacos = {
  id: 2,
  name: 'Hot Tacos',
  description: 'Mexican tortilla & tacos',
  categories: [1, 3],
  price: 10.99,
  calories: 78,
  isFavorite: false,
  image: require('../../assets/dummyData/hot_tacos.png'),
};

const vegBiryani = {
  id: 3,
  name: 'Veg Biryani',
  description: 'Indian Vegetable Biryani',
  categories: [1, 2, 3],
  price: 10.99,
  calories: 78,
  isFavorite: true,
  image: require('../../assets/dummyData/veg_biryani.png'),
};

const wrapSandwich = {
  id: 4,
  name: 'Wrap Sandwich',
  description: 'Grilled vegetables sandwich',
  categories: [1, 2],
  price: 10.99,
  calories: 78,
  isFavorite: true,
  image: require('../../assets/dummyData/wrap_sandwich.png'),
};

const posts: Post[] = [
  {
    id: 1,
    user: {
      id: 1,
      username: `Krin Ramos`,
      firstName: 'Krin',
      lastName: 'Ramos',
      userImage: 'https://randomuser.me/api/portraits/women/96.jpg',
      userKarma: 70,
    },
    date: new Date(),
    postText: 'krin is in miami, who should she meet?',
  },
  {
    id: 2,
    user: {
      id: 2,
      username: `Penny Lopez`,
      firstName: 'Penny',
      lastName: 'Lopez',
      userImage: 'https://randomuser.me/api/portraits/women/74.jpg',
      userKarma: 43,
    },
    date: new Date(),
    postText: 'Penny is in NYC, what are some of the best restaurants there that she should try?',
  },
  {
    id: 3,
    user: {
      id: 2,
      username: `Jesse Sullivan`,
      firstName: 'Jesse',
      lastName: 'Sullivan',
      userImage: 'https://randomuser.me/api/portraits/men/74.jpg',
      userKarma: 690,
    },
    date: new Date(),
    postText: 'Wanna watch the dolphins game at champs?',
  },
  {
    id: 4,
    user: {
      id: 2,
      username: `Moustafa Elhadary`,
      firstName: 'Moustafa',
      lastName: 'Elhadary',
      userImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      userKarma: 420,
    },
    date: new Date(),
    postText:
      'I am hungry and bored of the usual, what is the best wing place in town?',
  },
];

const menu = [
  {
    id: 1,
    name: 'Featured',
    list: [hamburger, hotTacos, vegBiryani],
  },
  {
    id: 2,
    name: 'Nearby you',
    list: [hamburger, vegBiryani, wrapSandwich],
  },
  {
    id: 3,
    name: 'Popular',
    list: [hamburger, hotTacos, wrapSandwich],
  },
  {
    id: 4,
    name: 'Newest',
    list: [hamburger, hotTacos, vegBiryani],
  },
  {
    id: 5,
    name: 'Trending',
    list: [hamburger, vegBiryani, wrapSandwich],
  },
  {
    id: 6,
    name: 'Recommended',
    list: [hamburger, hotTacos, wrapSandwich],
  },
];

export default {
  myProfile,
  categories,
  menu,
  posts,
};

const onboarding_screens = [
  {
    id: 1,
    bannerImage: require('../../assets/images/p1.png'),
    title: 'Get out of debt fast.',
    description:
      'From roundups to refinancing, We streamline every part of the debt paying process—so you can focus on your life, not your debt.',
  },
  {
    id: 2,
    bannerImage: require('../../assets/images/p3.png'),
    title: 'Payoff your debt',
    description:
      'We take the change from your everyday purchases and use it to pay off your loans.',
  },
  {
    id: 3,
    bannerImage: require('../../assets/images/p2.png'),
    title: 'Unlock the power of people (coming soon)',
    description:
      'Receive matching contributions from friends, family or your employer.',
  },
];

const screens = {
  main_layout: 'MainLayout',
  home: 'Home',
  transactions: 'Transactions',
  funding: 'Funding',
  profile: 'Profile',
};

const bottom_tabs = [
  {
    id: 0,
    label: screens.home,
  },
  {
    id: 1,
    label: screens.transactions,
  },
  {
    id: 2,
    label: screens.funding,
  },
  {
    id: 3,
    label: screens.profile,
  },
];

const delivery_time = [
  {
    id: 1,
    label: '10 Mins',
  },
  {
    id: 2,
    label: '20 Mins',
  },
  {
    id: 3,
    label: '30 Mins',
  },
];

const ratings = [
  {
    id: 1,
    label: 1,
  },
  {
    id: 2,
    label: 2,
  },
  {
    id: 3,
    label: 3,
  },
  {
    id: 4,
    label: 4,
  },
  {
    id: 5,
    label: 5,
  },
];

const tags = [
  {
    id: 1,
    label: 'Burger',
  },
  {
    id: 2,
    label: 'Fast Food',
  },
  {
    id: 3,
    label: 'Pizza',
  },
  {
    id: 4,
    label: 'Asian',
  },
  {
    id: 5,
    label: 'Dessert',
  },
  {
    id: 6,
    label: 'Breakfast',
  },
  {
    id: 7,
    label: 'Vegetable',
  },
  {
    id: 8,
    label: 'Taccos',
  },
];

export default {
  onboarding_screens,
  screens,
  bottom_tabs,
  delivery_time,
  ratings,
  tags,
};

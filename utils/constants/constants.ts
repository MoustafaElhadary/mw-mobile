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
  deposits: 'Deposits',
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
    label: screens.deposits,
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


export default {
  onboarding_screens,
  screens,
  bottom_tabs,
};

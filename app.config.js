import 'dotenv/config';

export default {
  expo: {
    name: 'MochaWallet',
    slug: 'MochaWallet',
    version: '1.0.4',
    orientation: 'portrait',
    icon: 'assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.Moustafa.MochaWallet',
    },
    userInterfaceStyle: 'automatic',
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      mapsAPIkey: process.env.MAPS_API_KEY,
      apiUrl: process.env.API_URL,
    },
  },
};

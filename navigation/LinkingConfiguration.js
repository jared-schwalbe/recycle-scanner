import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          HomeTab: {
            screens: {
              HomeScreen: 'home',
            },
          },
          ScanTab: {
            screens: {
              ScanScreen: 'scan',
            },
          },
          LocationTab: {
            screens: {
              LocationScreen: 'location',
            },
          },
        },
      },
    },
  },
};

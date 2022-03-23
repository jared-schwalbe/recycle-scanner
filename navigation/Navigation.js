import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import LocationScreen from '../screens/LocationScreen';
import LinkingConfiguration from './LinkingConfiguration';

import homeIcon from '../assets/home.png';
import scanIcon from '../assets/scan.png';
import locationIcon from '../assets/location.png';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarStyle: {
          backgroundColor: '#f4f4f4',
          borderTopWidth: 0,
          height: 120,
          marginBottom: 0,
        },
      }}>
      <BottomTab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={() => ({
          tabBarIcon: () => <Image source={homeIcon} style={styles.homeIcon} />,
        })}
      />
      <BottomTab.Screen
        name="ScanTab"
        component={ScanScreen}
        options={() => ({
          tabBarStyle: { display: 'none' },
          tabBarIcon: () => <Image source={scanIcon} style={styles.scanIcon} />,
        })}
      />
      <BottomTab.Screen
        name="LocationTab"
        component={LocationScreen}
        options={{
          tabBarIcon: () => <Image source={locationIcon} style={styles.locationIcon} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeIcon: {
    width: 26,
    height: 26,
    marginLeft: 20,
  },
  scanIcon: {
    width: 60,
    height: 60,
  },
  locationIcon: {
    width: 26,
    height: 26,
    marginRight: 20,
  },
});

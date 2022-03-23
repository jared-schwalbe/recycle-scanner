import React from 'react';
import { Text, Image,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Profile from './Profile';
import MainCard from './MainCard';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Profile points="4,800" />
      <MainCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1,
  },
});

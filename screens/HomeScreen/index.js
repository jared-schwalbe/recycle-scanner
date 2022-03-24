import React from 'react';
import { Text, Image,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ModalProvider } from '../../contexts/ModalContext';
import Profile from './Profile';
import MainCard from './MainCard';
import RecyclableList from './RecyclableList';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ModalProvider>
        <Profile points="4,800" />
        <MainCard />
        <RecyclableList />
      </ModalProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
  },
});

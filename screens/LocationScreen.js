import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LocationScreen() {
  return (
    <View style={styles.container}>
      <Text>Location screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    flex: 1,
    justifyContent: 'center',
  },
});

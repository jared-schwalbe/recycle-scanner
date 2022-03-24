import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import profileIcon from '../../assets/profile.png';

export default function Profile({ points }) {
  return (
    <View style={styles.container}>
      <Image source={profileIcon} style={styles.profileIcon} />
      <Text style={styles.points}>
        <Text style={{ fontWeight: 'bold' }}>{points}</Text> points
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    height: 32,
    marginRight: 8,
    width: 32,
  },
  points: {
    fontSize: 13,
  },
});

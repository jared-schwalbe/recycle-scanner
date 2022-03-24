import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Dimensions } from 'react-native';

import kidRecycling from '../../assets/kid-recycling.png';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default function MainCard({ points }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Earn points for discarded waste</Text>
      <ImageBackground source={kidRecycling} resizeMode="cover" style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#c6e8e5',
    borderRadius: 10,
    marginTop: 20,
    height: 300,
    width: WINDOW_WIDTH - 60,
  },
  image: {
    position: 'absolute',
    bottom: 15,
    right: 2,
    height: 200,
    width: 200,
  },
  text: {
    fontFamily: 'RobotoSlab',
    fontSize: 24,
    marginLeft: 25,
    marginTop: 20,
    width: '55%',
  },
});

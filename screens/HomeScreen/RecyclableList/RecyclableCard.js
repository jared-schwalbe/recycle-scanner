import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const CARD_SIZE = (WINDOW_WIDTH / 3) - 30;

export default function RecyclableCard({ color, icon, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, { backgroundColor: color }]}>
        <Image source={icon} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    height: CARD_SIZE,
    justifyContent: 'center',
    marginTop: 20,
    width: CARD_SIZE,
  },
  icon: {
    height: '70%',
    width: '70%',
  },
});

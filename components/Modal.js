import React, { useState, useEffect } from 'react';
import { View, Image, Text, Pressable, Animated, StyleSheet, Dimensions } from 'react-native';

import closeIcon from '../assets/close-red.png';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

export default function Modal({ closeModal, children, title }) {
  const [fade] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.background, { opacity: fade }]}>
      <View style={styles.container}>
        <Pressable onPress={closeModal}>
          <Image source={closeIcon} style={styles.close} />
          <Text style={styles.title}>{title}</Text>
          <View styles={styles.children}>{children}</View>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    bottom: -200,
    left: -200,
    justifyContent: 'center',
    position: 'absolute',
    right: -200,
    top: -200,
    zIndex: 1,
  },
  children: {
    margin: 20,
  },
  close: {
    height: 34,
    position: 'absolute',
    right: -12,
    width: 34,
    top: -12,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: WINDOW_WIDTH - 130,
    width: WINDOW_WIDTH - 130,
  },
  title: {
    marginLeft: 25,
    marginTop: 20,
    fontSize: 18,
  },
});

import React, { useContext } from 'react';
import { View, Image, Text, Pressable, StyleSheet, Dimensions } from 'react-native';

import { ModalContext } from '../../contexts/ModalContext';
import Modal from '../../components/Modal';
import glassIcon from '../../assets/glass.png';
import plasticIcon from '../../assets/plastic.png';
import cardboardIcon from '../../assets/cardboard.png';

const WINDOW_WIDTH = Dimensions.get('window').width;
const CARDS_PER_LINE = 3;

export default function RecyclableList() {
  const openModal = useContext(ModalContext);
  const modal = props => <Modal title="Glass" {...props} />;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recyclable materials</Text>
      <View style={styles.list}>
        <Pressable onPress={() => openModal(modal, { title: 'Glass' })}>
          <View style={[styles.card, { backgroundColor: '#729bd5' }]}>
            <Image source={glassIcon} style={styles.icon} />
          </View>
        </Pressable>
        <Pressable onPress={() => openModal(modal, { title: 'Plastic' })}>
          <View style={[styles.card, { backgroundColor: '#6ac9a7' }]}>
            <Image source={plasticIcon} style={styles.icon} />
          </View>
        </Pressable>
        <Pressable onPress={() => openModal(modal, { title: 'Cardboard' })}>
          <View style={[styles.card, { backgroundColor: '#fce2a7' }]}>
            <Image source={cardboardIcon} style={styles.icon} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    height: (WINDOW_WIDTH / CARDS_PER_LINE) - (10 * CARDS_PER_LINE),
    width: (WINDOW_WIDTH / CARDS_PER_LINE) - (10 * CARDS_PER_LINE),
  },
  container: {
    flexDirection: 'column',
    marginTop: 20,
  },
  icon: {
    height: '80%',
    width: '80%',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

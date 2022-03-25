import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import RecyclableCard from './RecyclableCard';
import Modal from '../../../components/Modal';
import { ModalContext } from '../../../contexts/ModalContext';
import glassIcon from '../../../assets/glass.png';
import plasticIcon from '../../../assets/plastic.png';
import metalIcon from '../../../assets/metal.png';
import cardboardIcon from '../../../assets/cardboard.png';
import paperIcon from '../../../assets/paper.png';
import compostIcon from '../../../assets/compost.png';

const WINDOW_WIDTH = Dimensions.get('window').width;
const CARDS_PER_LINE = 3;

export default function RecyclableList() {
  const openModal = useContext(ModalContext);
  const modal = props => <Modal {...props} />;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recyclable materials</Text>
      <View style={styles.list}>
        <RecyclableCard
          color="#729bd5"
          icon={glassIcon}
          onPress={() => openModal(modal, { title: 'Glass' })}
        />
        <RecyclableCard
          color="#6ac9a7"
          icon={plasticIcon}
          onPress={() => openModal(modal, { title: 'Plastic' })}
        />
        <RecyclableCard
          color="#f2bbb4"
          icon={metalIcon}
          onPress={() => openModal(modal, { title: 'Metal' })}
        />
        <RecyclableCard
          color="#fce2a7"
          icon={cardboardIcon}
          onPress={() => openModal(modal, { title: 'Cardboard' })}
        />
        <RecyclableCard
          color="#c8b3f3"
          icon={paperIcon}
          onPress={() => openModal(modal, { title: 'Paper' })}
        />
        <RecyclableCard
          color="#b3def3"
          icon={compostIcon}
          onPress={() => openModal(modal, { title: 'Compost' })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

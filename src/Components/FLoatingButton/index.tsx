import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

import styles from './styles';

const FloatingButton = ({ setModalVisible }) => {

    const openModal = () => {
        setModalVisible(true);
    }

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={openModal}>
      <Text style={styles.add}>+</Text>
    </TouchableOpacity>
  )
}

export default FloatingButton
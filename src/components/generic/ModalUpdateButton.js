import React from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const ModalUpdateButton = ({modalVisible, setModalVisible}) => {
  return (
    <TouchableOpacity style={styles.updateButton}>
      <FontAwesomeIcon name={'close'} size={16} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  updateButton: {
    backgroundColor: '#007aff',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
});

export default ModalUpdateButton;

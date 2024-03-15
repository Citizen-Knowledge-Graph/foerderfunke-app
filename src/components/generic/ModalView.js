import React from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ModalView = ({children, modalVisible, setModalVisible, hideButton}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.hideButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.hideButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>{hideButton}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  hideButton: {
    backgroundColor: '#8e8e93',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ModalView;

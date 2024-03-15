import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ModalUpdateButton = ({
  category,
  updateValue,
  setModalVisible,
  updateGraph,
}) => {
  return (
    <TouchableOpacity
      style={styles.updateButton}
      onPress={() => {
        setModalVisible(false);
        updateGraph(category, updateValue);
      }}>
      <View style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  updateButton: {
    backgroundColor: '#007aff',
    borderRadius: 5,
    padding: 4,
    elevation: 2,
    margin: 4,
  },
  updateButtonText: {
    fontSize: 16,
  },
});

export default ModalUpdateButton;

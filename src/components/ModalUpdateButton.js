import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {updatePredicatedObject} from '../utilities/graphManagement';
import useDeserializedUserData from '../hooks/useDeserializedUserData';
import userReportAction, {performUpdate} from '../storage/actions/userReport';
import {useDispatch} from 'react-redux';

const ModalUpdateButton = ({entry, updateValue, setModalVisible}) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.updateButton}
      onPress={() => {
        setModalVisible(false);
        dispatch(performUpdate(entry, updateValue));
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

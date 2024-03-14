import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ProfileListItem from './ProfileListItem';
import {getFirstAttributeValue} from '../../utilities/graphManagement';

const ProfileList = ({profileData}) => {
  const [modalVisible, setModalVisible] = useState(true);

  const dataFields = [
    ['hasBirthday', 'Birthday'],
    ['hasResidence', 'Residence'],
    ['hasDrivingLicense', 'Driving License'],
    ['hasChildren', 'Children'],
  ];

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            {/* Button inside the modal to close it */}
            <TouchableOpacity
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {dataFields.map((field, index) => {
        const value = getFirstAttributeValue(
          profileData,
          'citizen-a',
          field[0],
        );
        return value !== undefined ? (
          <ProfileListItem
            key={index}
            category={field[1]}
            value={value}
            onOpenModal={setModalVisible}
          />
        ) : null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ProfileList;

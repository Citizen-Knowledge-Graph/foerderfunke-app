import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProfileListItem from './ProfileListItem';
import {getFirstAttributeValue} from '../../utilities/graphManagement';
import ModalView from '../generic/ModalView';
import UpdateProfileListItem from './UpdateProfileListItem';

const ProfileList = ({profileScreenData}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(['', '']);

  return (
    <View style={styles.container}>
      <ModalView
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        updateButton={'Update Profile'}
        category={currentCategory[0]}>
        <UpdateProfileListItem
          category={currentCategory[0]}
          value={currentCategory[1]}
          setModalVisible={setModalVisible}
        />
      </ModalView>
      {Object.entries(profileScreenData).map(([key, valuePair], index) => (
        <ProfileListItem
          key={index}
          category={valuePair.title}
          value={valuePair.value}
          onOpenModal={setModalVisible}
          onUpdateField={setCurrentCategory}
        />
      ))}
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
    marginTop: 22,
  },
  modalView: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
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
  openButton: {
    backgroundColor: '#8e8e93',
    borderRadius: 5,
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

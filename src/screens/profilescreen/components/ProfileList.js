import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileListItem from './ProfileListItem';
import BottomView from './BottomView';

const ProfileList = ({ profileScreenData }) => {
  const [currentEntry, setCurrentEntry] = useState(null);

  const bottomSheetModalRef = useRef(null);

  const handleOpenPress = () => bottomSheetModalRef.current.present();

  return (
    <View style={styles.container}>
      <BottomView
        bottomSheetModalRef={bottomSheetModalRef}
        currentEntry={currentEntry}
      />
      {profileScreenData.map((entry, index) => (
        <ProfileListItem
          key={index}
          entry={entry}
          handleOpenPress={handleOpenPress}
          setCurrentEntry={setCurrentEntry}
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

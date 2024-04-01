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
});

export default ProfileList;

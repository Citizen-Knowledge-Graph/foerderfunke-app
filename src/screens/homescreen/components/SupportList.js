import React from 'react';
import {View, StyleSheet} from 'react-native';
import SupportListItem from './SupportListItem';

const SupportList = ({homeScreenData}) => {
  return (
    <View style={styles.container}>
      {homeScreenData.map((scheme, index) => (
        <SupportListItem key={index} scheme={scheme} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SupportList;

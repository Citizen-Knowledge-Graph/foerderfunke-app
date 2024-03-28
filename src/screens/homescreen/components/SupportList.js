import React from 'react';
import SupportListItem from './SupportListItem';
import { View } from 'react-native';

const SupportList = ({ homeScreenData }) => {
  return (
    <View>
      {homeScreenData.map((scheme, index) => (
        <SupportListItem key={index} scheme={scheme} />
      ))}
    </View>
  );
};

export default SupportList;

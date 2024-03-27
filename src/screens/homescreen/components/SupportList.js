import React from 'react';
import SupportListItem from './SupportListItem';
import { YGroup } from 'tamagui';

const SupportList = ({ homeScreenData }) => {
  return (
    <YGroup alignSelf="flex-start" size="$md">
      {homeScreenData.map((scheme, index) => (
        <SupportListItem key={index} scheme={scheme} />
      ))}
    </YGroup>
  );
};

export default SupportList;

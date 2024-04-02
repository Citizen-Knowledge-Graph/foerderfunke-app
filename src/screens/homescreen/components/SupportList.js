import React from 'react';
import SupportListItem from './SupportListItem';
import { View } from 'react-native';
import { SizableText, Card, styled } from 'tamagui';
import { colorTokens } from '@tamagui/themes';

const SupportList = ({ homeScreenData }) => {
  console.log(homeScreenData);
  return (
    <View>
      {homeScreenData.eligible.map((scheme, index) => (
        <SupportListItem key={index} scheme={scheme} />
      ))}
      <NonEligibleHeader>
        <SizableText size='$7' color={'black'} fontWeight={'600'}>
          Nicht verfügbare Förderungen
        </SizableText>
      </NonEligibleHeader>
      {homeScreenData.nonEligible.map((scheme, index) => (
        <SupportListItem key={index} scheme={scheme} />
      ))}
    </View>
  );
};

const NonEligibleHeader = styled(Card, {
  padding: 8,
  marginVertical: 8,
  backgroundColor: colorTokens.light.red.red6,
  borderRadius: 0,
});

export default SupportList;

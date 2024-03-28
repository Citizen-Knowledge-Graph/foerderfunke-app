import React from 'react';
import { View } from 'react-native';
import { Card, SizableText, styled } from 'tamagui';

const SchemeInfo = ({ schemeScreenData }) => {
  return (
    <View>
      <InfoItem>
        <SizableText size="$6" color={'black'} fontWeight={'500'}>
          Erklärung
        </SizableText>
        <SizableText size="$5" color={'black'}>
          {schemeScreenData.data.description_long}}
        </SizableText>
      </InfoItem>
      <InfoItem>
        <SizableText size="$6" color={'black'} fontWeight={'500'}>
          Antragstellung
        </SizableText>
        <SizableText size="$5" color={'black'}>
          {schemeScreenData.data.description_long}}
        </SizableText>
      </InfoItem>
    </View>
  );
};

const InfoItem = styled(Card, {
  paddingVertical: 8,
  marginVertical: 8,
  backgroundColor: '#FFFFFF',
  borderRadius: 0,
});

export default SchemeInfo;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SizableText, Button, styled, Card, XStack } from 'tamagui';
import { ChevronLeft } from '@tamagui/lucide-icons';

const SectionHeader = ({ screenName, backButton }) => {
  const navigation = useNavigation(); // Use the useNavigation hook

  return (
    <SectionHeaderContainer>
      {backButton ? (
        <BackButton
          icon={<ChevronLeft size="$2" color={'black'} />}
          onPress={() => navigation.goBack()}
        />
      ) : null}
      <SizableText size="$9" color={'black'} fontWeight={'500'}>
        {screenName}
      </SizableText>
    </SectionHeaderContainer>
  );
};

const BackButton = styled(Button, {
  paddingRight: 8,
  paddingLeft: 0,
  backgroundColor: '#FFFFFF',
  borderRadius: 0,
  borderWidth: 0,
  pressStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
  },
});

const SectionHeaderContainer = styled(XStack, {
  paddingHorizontal: 16,
  marginVertical: 8,
});

export default SectionHeader;

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SizableText, Paragraph, styled, Card } from 'tamagui';

const SupportListItem = ({ scheme }) => {
  const navigation = useNavigation();

  const handleListItemPress = () => {
    navigation.navigate('SchemeStackScreen', { scheme: scheme.key });
  };

  return (
    <TouchableOpacity onPress={handleListItemPress}>
      <ListItem>
        <SizableText size='$6' color={'black'} fontWeight={'500'}>
          {scheme.title}
        </SizableText>
        <Paragraph size='$4' color={'black'} fontWeight={'300'}>
          {scheme.description}
        </Paragraph>
      </ListItem>
    </TouchableOpacity>
  );
};

const ListItem = styled(Card, {
  paddingVertical: 8,
  marginVertical: 8,
  backgroundColor: '#FFFFFF',
  borderTopWidth: 1,
  borderRadius: 0,
});

export default SupportListItem;

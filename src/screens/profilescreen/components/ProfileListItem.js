import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, styled, SizableText } from 'tamagui';

const ProfileListItem = ({ entry, handleOpenPress, setCurrentEntry }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handleOpenPress();
        setCurrentEntry(entry);
      }}
    >
      <ListItem>
        <View>
          <SizableText color={'black'}>{entry.displayName}</SizableText>
          <SizableText size="$6" fontWeight={'500'} color={'black'}>
            {entry.object.value}
          </SizableText>
        </View>
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

export default ProfileListItem;

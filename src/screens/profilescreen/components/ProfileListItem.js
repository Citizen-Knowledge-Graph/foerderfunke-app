import React from 'react';
import { View } from 'react-native';
import { Card, styled, SizableText, Button } from 'tamagui';
import { Edit3 } from '@tamagui/lucide-icons';
import { colorTokens } from '@tamagui/themes';

const ProfileListItem = ({ entry, handleOpenPress, setCurrentEntry }) => {
  console.log('ProfileListItem', entry);
  return (
    <ListItem>
      <View
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <View>
          <SizableText color={'black'}>{entry.displayName}</SizableText>
          <SizableText size='$6' fontWeight={'500'} color={'black'}>
            {entry.value}
          </SizableText>
        </View>
        <Button
          width={24}
          height={24}
          backgroundColor={'white'}
          icon={<Edit3 size='$1' color={'black'} />}
          pressStyle={{
            backgroundColor: colorTokens.light.gray.gray8,
            borderColor: 'white',
          }}
          onPress={() => {
            setCurrentEntry(entry);
            handleOpenPress();
          }}
        />
      </View>
    </ListItem>
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

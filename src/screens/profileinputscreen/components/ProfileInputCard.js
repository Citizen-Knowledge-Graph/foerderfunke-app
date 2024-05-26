import React from 'react';
import ProfileInputLiterals from './ProfileInputLiterals';
import { Card, XStack, YStack } from 'tamagui';
import { StyleSheet } from 'react-native';
import { colorTokens } from '@tamagui/themes';
import ObjectInput from './InputObjectClass';

const ProfileInputCard = ({ item, setInputFieldData }) => {
  return (
    <XStack justifyContent={'center'}>
      {item.inputData.datatype !== 'class' ? (
        <Card style={styles.profileInputCard} flex={1}>
          <YStack flex={1} justifyContent={'flex-end'}>
            <XStack
              justifyContent={'space-between'}
              paddingHorizontal={8}
              gap={10}
            >
              <ProfileInputLiterals
                item={item}
                setInputFieldData={setInputFieldData}
              />
            </XStack>
          </YStack>
        </Card>
      ) : (
        <Card style={styles.profileInputCardObject} flex={1}>
          <YStack flex={1} justifyContent={'flex-end'}>
            <XStack justifyContent={'center'} paddingHorizontal={8} gap={10}>
              <ObjectInput item={item} setInputData={setInputFieldData} />
            </XStack>
          </YStack>
        </Card>
      )}
    </XStack>
  );
};

const styles = StyleSheet.create({
  profileInputCard: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colorTokens.light.gray.gray8,
  },
  profileInputCardObject: {
    padding: 8,
    backgroundColor: 'white',
  },
});

export default ProfileInputCard;

import React from 'react';
import { Card, SizableText, XStack, YStack } from 'tamagui';
import { Info } from '@tamagui/lucide-icons';
import { StyleSheet } from 'react-native';
import { colorTokens } from '@tamagui/themes';
import ProfileInputField from './ProfileInputField';

const ProfileInputCard = ({ item, setInputFieldData }) => {
  return (
    <YStack gap={10}>
      <XStack justifyContent={'center'}>
        <Card style={styles.profileQuestionCard} flex={1}>
          <YStack flex={1} justifyContent={'flex-end'}>
            <XStack
              justifyContent={'space-between'}
              paddingHorizontal={8}
              gap={10}
            >
              <SizableText size='$6' style={styles.infoCardText}>
                {item.title}
              </SizableText>
              <Info size='$1' color={'black'} />
            </XStack>
          </YStack>
        </Card>
      </XStack>
      <XStack justifyContent={'center'}>
        <Card style={styles.profileInputCard} flex={1}>
          <YStack flex={1} justifyContent={'flex-end'}>
            <XStack
              justifyContent={'space-between'}
              paddingHorizontal={8}
              gap={10}
            >
              <ProfileInputField
                item={item}
                setInputFieldData={setInputFieldData}
              />
            </XStack>
          </YStack>
        </Card>
      </XStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  profileQuestionCard: {
    flex: 1,
    padding: 16,
    backgroundColor: colorTokens.light.yellow.yellow7,
    borderWidth: 1,
    borderColor: 'white',
  },
  profileInputCard: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colorTokens.light.gray.gray8,
  },
  infoCardText: {
    color: 'black',
  },
  inputBox: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 20,
  },
});

export default ProfileInputCard;

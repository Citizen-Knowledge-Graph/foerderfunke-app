import React from 'react';
import { StyleSheet } from 'react-native';
import ScreenView from '../../../components/ScreenView';
import { SizableText, XStack, YStack, Card } from 'tamagui';
import { colorTokens } from '@tamagui/themes';
import { Info } from '@tamagui/lucide-icons';
import ProfileInputCard from './ProfileInputCard';

const ProfileInputScreen = ({ route }) => {
  const { title } = route.params;

  return (
    <ScreenView screenName={title} backButton={true} showName={false}>
      <YStack gap={20}>
        <XStack justifyContent={'center'}>
          <SizableText size='$9' style={styles.titleText} flex={1}>
            {title}
          </SizableText>
        </XStack>
        <YStack>
          <XStack justifyContent={'center'}>
            <Card style={styles.infoCard} flex={1}>
              <YStack flex={1} justifyContent={'flex-end'}>
                <XStack
                  justifyContent={'center'}
                  paddingHorizontal={8}
                  gap={10}
                >
                  <Info size='$1' color={'black'} />
                  <SizableText size='$5' style={styles.infoCardText}>
                    Let’s start your profile to discover social benefits for
                    you. If you need help, you can always use the info icon.
                  </SizableText>
                </XStack>
              </YStack>
            </Card>
          </XStack>
        </YStack>
        <YStack gap={30}>
          <ProfileInputCard title={'First name'} />
          <ProfileInputCard title={'First name'} />
          <ProfileInputCard title={'First name'} />
          <ProfileInputCard title={'First name'} />
          <ProfileInputCard title={'First name'} />
        </YStack>
      </YStack>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    fontWeight: 'bold',
  },
  subTitleText: {
    color: 'black',
  },
  infoCard: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colorTokens.light.blue.blue5,
  },
  infoCardText: {
    color: 'black',
  },
});

export default ProfileInputScreen;

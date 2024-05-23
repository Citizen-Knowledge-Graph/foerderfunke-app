import ScreenView from '../../../components/ScreenView';
import { Card, SizableText, XStack, YStack } from 'tamagui';
import { Info } from '@tamagui/lucide-icons';
import OnboardingSections from './OnboardingSections';
import { StyleSheet } from 'react-native';
import { colorTokens } from '@tamagui/themes';
import React from 'react';

const OnboardingContext = ({ personalisedScreenData }) => {
  return (
    <ScreenView screenName={'Choice'} backButton={true} showName={false}>
      <YStack gap={20}>
        <YStack gap={10}>
          <XStack justifyContent={'center'}>
            <SizableText size='$9' style={styles.titleText} flex={1}>
              Discover personalised benefits
            </SizableText>
          </XStack>
          <XStack justifyContent={'center'}>
            <SizableText size='$7' style={styles.subTitleText} flex={1}>
              Answer some questions about you will find out to which benefits
              you might be eligible to. The more questions you answer, the more
              accurate will be the results you get.
            </SizableText>
          </XStack>
        </YStack>
        <YStack gap={10}>
          <XStack justifyContent={'center'}>
            <Card size='$8' style={styles.infoCard}>
              <YStack flex={1} justifyContent={'flex-end'}>
                <XStack
                  justifyContent={'center'}
                  paddingHorizontal={8}
                  gap={10}
                >
                  <Info size='$1' color={'black'} />
                  <SizableText size='$6' style={styles.infoCardText}>
                    All data is stored locally on your device. It never leaves
                    your device.
                  </SizableText>
                </XStack>
              </YStack>
            </Card>
          </XStack>
        </YStack>
        <OnboardingSections personalisedScreenData={personalisedScreenData} />
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
    backgroundColor: colorTokens.light.blue.blue5,
  },
  infoCardText: {
    color: 'black',
  },
});

export default OnboardingContext;

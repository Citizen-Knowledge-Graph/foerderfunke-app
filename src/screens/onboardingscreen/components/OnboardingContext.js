import React from 'react';
import { SizableText, XStack, YStack } from 'tamagui';
import { StyleSheet } from 'react-native';
import { colorTokens } from '@tamagui/themes';
import ScreenView from '../../../components/ScreenView';
import OnboardingSections from './OnboardingSections';

const OnboardingContext = ({ personalisedScreenData }) => {
  return (
    <ScreenView screenName={'Onboarding'} backButton={true} showName={false}>
      <YStack gap={20}>
        <YStack gap={10}>
          <XStack justifyContent={'center'}>
            <SizableText size='$9' style={styles.titleText} flex={1}>
              Dein Profil
            </SizableText>
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
  buttonCard: {
    flex: 1,
    padding: 16,
    backgroundColor: colorTokens.light.blue.blue12,
  },
  buttonCardText: {
    color: 'white',
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default OnboardingContext;

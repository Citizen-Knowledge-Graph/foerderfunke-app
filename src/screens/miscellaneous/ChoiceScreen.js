import React from 'react';
import { StyleSheet } from 'react-native';
import ScreenView from '../../components/ScreenView';
import { SizableText, XStack, YStack, Card } from 'tamagui';
import { colorTokens } from '@tamagui/themes';

const ChoiceScreen = ({ navigation }) => {
  return (
    <ScreenView screenName={'Choice'} backButton={true} showName={false}>
      <YStack gap={20}>
        <YStack gap={10}>
          <XStack justifyContent={'center'}>
            <SizableText size='$10' style={styles.titleText}>
              Your Choice
            </SizableText>
          </XStack>
          <XStack justifyContent={'center'} paddingHorizontal={20}>
            <SizableText
              size='$8'
              color={'black'}
              fontWeight={400}
              textAlign={'center'}
            >
              Two ways of discovering benefits for you
            </SizableText>
          </XStack>
        </YStack>
        <YStack gap={10}>
          <XStack justifyContent={'center'}>
            <Card
              size='$8'
              style={styles.choiceCard}
              onPress={() => {
                navigation.navigate('OnboardingWelcomeStackScreen');
              }}
            >
              <YStack flex={1} justifyContent={'flex-end'}>
                <SizableText size='$9' style={styles.choiceCardText}>
                  Discover personalised benefits
                </SizableText>
              </YStack>
            </Card>
          </XStack>
          <XStack justifyContent={'center'}>
            <Card
              size='$8'
              style={styles.choiceCard}
              onPress={() => {
                navigation.navigate('MainTabNavigator');
              }}
            >
              <YStack flex={1} justifyContent={'flex-end'}>
                <SizableText size='$9' style={styles.choiceCardText}>
                  Browse all social benefits
                </SizableText>
              </YStack>
            </Card>
          </XStack>
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
  choiceCard: {
    flex: 1,
    height: 250,
    padding: 20,
    backgroundColor: colorTokens.light.blue.blue12,
  },
  choiceCardText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default ChoiceScreen;

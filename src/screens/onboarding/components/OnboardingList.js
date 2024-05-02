import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { XStack, YStack, Button } from 'tamagui';
import FullScreenView from './FullScreenView';
import { useNavigation } from '@react-navigation/native';
import OnboardingCard from './OnboardingCard';
import { useScrollHandler } from '../hooks/useScrollHandler';

const { height } = Dimensions.get('window');

const OnboardingList = ({ onboardingScreenData }) => {
  const navigation = useNavigation();
  const {
    scrollViewRef,
    scrollToNext,
    scrollToPrev,
    handleScroll,
    currentIndex,
  } = useScrollHandler(onboardingScreenData, height);

  return (
    <FullScreenView ref={scrollViewRef} handleScroll={handleScroll}>
      <XStack alignSelf='center' backgroundColor={'white'}>
        <YStack flex={1}>
          {onboardingScreenData.onboadingCards.map((onboardingCard, index) => (
            <OnboardingCard
              key={index}
              onboardingCard={onboardingCard}
              scrollToPrev={scrollToPrev}
              scrollToNext={scrollToNext}
              currentIndex={currentIndex}
            />
          ))}
          <YStack
            flex={1}
            alignSelf={'center'}
            justifyContent={'center'}
            style={styles.fullScreenContainer}
          >
            <Button onPress={() => navigation.navigate('MainTabNavigator')}>
              Go to Home Screen
            </Button>
          </YStack>
        </YStack>
      </XStack>
    </FullScreenView>
  );
};

export default OnboardingList;

const styles = StyleSheet.create({
  fullScreenContainer: {
    height: height,
    backgroundColor: 'white',
  },
});

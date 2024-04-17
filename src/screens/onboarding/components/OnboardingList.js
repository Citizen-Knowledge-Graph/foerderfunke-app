import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { XStack, YStack, Button } from 'tamagui';
import FullScreenView from './FullScreenView';
import { useNavigation } from '@react-navigation/native';
import InputCard from './InputCard';

const { height } = Dimensions.get('window');

const OnboardingList = ({ onboardingScreenData }) => {
  const navigation = useNavigation(); // Use the useNavigation hook

  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current screen index

  const scrollToNext = () => {
    if (currentIndex < onboardingScreenData.length) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollViewRef.current?.scrollTo({
        y: newIndex * height,
        animated: true,
      });
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollViewRef.current?.scrollTo({
        y: newIndex * height,
        animated: true,
      });
    }
  };

  const handleScroll = (event, entry) => {
    const newY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(newY / height);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <FullScreenView ref={scrollViewRef} handleScroll={handleScroll}>
      <XStack alignSelf='center' backgroundColor={'white'}>
        <YStack flex={1}>
          {onboardingScreenData.map((entry, index) => (
            <InputCard
              key={index}
              entry={entry}
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

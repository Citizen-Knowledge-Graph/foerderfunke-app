import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { XStack, YStack, Button } from 'tamagui';
import FullScreenView from './FullScreenView';
import { useNavigation } from '@react-navigation/native';
import InputCard from './InputCard';

const { height } = Dimensions.get('window');

const OnboardingList = ({ onboardingScreenData }) => {
  const navigation = useNavigation(); // Use the useNavigation hook

  return (
    <FullScreenView>
      <XStack alignSelf='center' backgroundColor={'white'}>
        <YStack flex={1}>
          {onboardingScreenData.map((entry, index) => (
            <InputCard key={index} entry={entry} />
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

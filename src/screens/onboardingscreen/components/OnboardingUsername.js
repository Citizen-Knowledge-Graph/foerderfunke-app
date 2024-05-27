import React from 'react';
import { Button, SizableText, XStack, YStack } from 'tamagui';
import { StyleSheet, TextInput } from 'react-native';

const OnboardingUsername = ({ navigation }) => {
  return (
    <YStack justifyContent={'center'}>
      <YStack justifyContent={'center'}>
        <XStack justifyContent={'center'}>
          <SizableText
            size='$9'
            flex={1}
            color={'black'}
            style={styles.titleText}
          >
            Your Username
          </SizableText>
        </XStack>
        <SizableText>Username</SizableText>
        <TextInput placeholder='Enter your username' />
        <Button
          title='Next'
          onPress={() => navigation.navigate('OnboardingPassword')}
        />
      </YStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    fontWeight: '400',
  },
});

export default OnboardingUsername;

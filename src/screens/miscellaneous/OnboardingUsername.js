import React from 'react';
import { Button, Card, SizableText, XStack, YStack } from 'tamagui';
import { StyleSheet, TextInput } from 'react-native';
import { colorTokens } from '@tamagui/themes';
import { Check } from '@tamagui/lucide-icons';
import ScreenView from '../../components/ScreenView';
import useCreateUserprofile from './hooks/useCreateUserprofile';

const OnboardingUsernameScreen = ({ navigation }) => {
  const createUserprofile = useCreateUserprofile();

  return (
    <ScreenView
      screenName={'OnboardingUsername'}
      backButton={true}
      showName={false}
    >
      <YStack justifyContent={'center'} gap={20}>
        <XStack justifyContent={'center'}>
          <SizableText
            size='$9'
            flex={1}
            color={'black'}
            style={styles.titleText}
          >
            Dein Username
          </SizableText>
        </XStack>
        <XStack justifyContent={'center'}>
          <SizableText size='$7' flex={1} color={'black'}>
            Bevor wir losgehen können, benötigen wir noch einen Benutzernamen
            von dir.
          </SizableText>
        </XStack>
        <XStack justifyContent={'center'}>
          <Card style={styles.profileInputCard} flex={1}>
            <YStack flex={1} justifyContent={'flex-end'}>
              <XStack
                justifyContent={'space-between'}
                paddingHorizontal={8}
                gap={10}
              >
                <TextInput
                  width={'100%'}
                  style={styles.inputField}
                  keyboardType='numeric'
                  placeholder='Dein Benutzername'
                />
              </XStack>
            </YStack>
          </Card>
        </XStack>
        <XStack justifyContent={'center'}>
          <Card
            style={styles.buttonCard}
            onPress={() => {
              navigation.navigate('OnboardingStackScreen');
              createUserprofile();
            }}
          >
            <SizableText size='$6' style={styles.buttonCardText}>
              Bestätigen
            </SizableText>
          </Card>
        </XStack>
      </YStack>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    fontWeight: 'bold',
  },
  profileInputCard: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colorTokens.light.gray.gray8,
  },
  inputField: {
    fontSize: 16,
  },
  buttonCard: {
    flex: 1,
    padding: 16,
    backgroundColor: colorTokens.light.green.green9,
  },
  buttonCardText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default OnboardingUsernameScreen;

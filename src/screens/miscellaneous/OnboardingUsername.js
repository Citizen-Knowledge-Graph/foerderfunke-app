import React, { useState } from 'react';
import { Card, SizableText, XStack, YStack } from 'tamagui';
import { StyleSheet, TextInput } from 'react-native';
import { colorTokens } from '@tamagui/themes';
import ScreenView from '../../components/ScreenView';
import useCreateUserprofile from './hooks/useCreateUserprofile';

const OnboardingUsernameScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [error, setError] = useState('');
  const createUserprofile = useCreateUserprofile(username);

  const handleCreateProfile = () => {
    createUserprofile()
      .then(() => {
        navigation.navigate('OnboardingStackScreen');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    setError('');
  };

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
                  onChangeText={(text) => handleUsernameChange(text)}
                />
              </XStack>
            </YStack>
          </Card>
        </XStack>
        {error ? (
          <XStack justifyContent={'center'}>
            <SizableText style={styles.errorText}>{error}</SizableText>
          </XStack>
        ) : null}
        <XStack justifyContent={'center'}>
          <Card style={styles.buttonCard} onPress={handleCreateProfile}>
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
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default OnboardingUsernameScreen;

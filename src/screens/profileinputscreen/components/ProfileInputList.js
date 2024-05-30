import React, { useState } from 'react';
import { Button, Card, SizableText, XStack, YStack } from 'tamagui';
import { Check, Info } from '@tamagui/lucide-icons';
import ProfileInputPair from './ProfileInputPair';
import { colorTokens } from '@tamagui/themes';
import { StyleSheet, ScrollView } from 'react-native';
import useAddProfileData from '../hooks/useAddProfileData';
import { useNavigation } from '@react-navigation/native';
import useUpdateCompletedSections from '../hooks/useUpdateCompletedSections';

const ProfileInputList = ({ sectionsData, profileInputData }) => {
  const { title, id } = sectionsData;
  const [inputFieldData, setInputFieldData] = useState([]);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const addProfileData = useAddProfileData(inputFieldData);
  const updateCompletedSections = useUpdateCompletedSections(id);

  // custom hooks
  const handleAddProfileData = () => {
    addProfileData()
      .then(() => {
        navigation.goBack();
        updateCompletedSections();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // component
  return (
    <ScrollView>
      <YStack gap={20}>
        <XStack justifyContent={'center'}>
          <SizableText size='$9' style={styles.titleText} flex={1}>
            {title}
          </SizableText>
        </XStack>
        {id === 'about-you' && (
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
        )}
        <YStack gap={30}>
          {profileInputData.profileInputFields.map((item, index) => (
            <ProfileInputPair
              key={index}
              item={item}
              setInputFieldData={setInputFieldData}
            />
          ))}
        </YStack>
        {error ? (
          <XStack justifyContent={'center'}>
            <SizableText style={styles.errorText}>{error}</SizableText>
          </XStack>
        ) : null}
        <XStack justifyContent={'flex-end'} gap={20} style={styles.confirmPane}>
          <Button
            iconAfter={<Check size='$1' color={'black'} />}
            onPress={handleAddProfileData}
            style={styles.confirmButton}
            pressStyle={{
              backgroundColor: colorTokens.light.gray.gray8,
            }}
          >
            Confirm
          </Button>
        </XStack>
      </YStack>
    </ScrollView>
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
  confirmPane: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
  },
  navigationButton: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: colorTokens.light.green.green7,
    color: 'black',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ProfileInputList;

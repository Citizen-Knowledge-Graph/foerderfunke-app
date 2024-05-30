import React from 'react';
import { StyleSheet } from 'react-native';
import { SizableText, XStack, YStack, Card } from 'tamagui';
import OnboardingSectionItem from './OnboardingSectionItem';
import { useProfileInputSectionStore } from '../../../storage/zustand';
import { colorTokens } from '@tamagui/themes';
import { useNavigation } from '@react-navigation/native';

const OnboardingSections = ({ personalisedScreenData }) => {
  const navigation = useNavigation(); // Use the useNavigation hook
  const activeSection = useProfileInputSectionStore(
    (state) => state.activeSection
  );
  const sections = useProfileInputSectionStore((state) => state.sections);
  const allCompleted = sections.every((obj) => obj.completed);

  const backgroundColor = allCompleted
    ? colorTokens.light.green.green9
    : colorTokens.light.gray.gray8;

  const handleCheckButton = () => {
    if (allCompleted) {
      navigation.navigate('MainTabNavigator');
    }
  };

  // component
  return (
    <YStack gap={30}>
      <YStack gap={10}>
        <XStack justifyContent={'center'}>
          <SizableText size='$9' style={styles.titleText} flex={1}>
            Profilbereiche
          </SizableText>
        </XStack>
        <YStack gap={16}>
          {personalisedScreenData.personalisedData.map((section, index) => {
            const sectionStatus = sections.filter(
              (s) => s.id === section.id
            )[0];
            return (
              <OnboardingSectionItem
                key={index}
                entityData={personalisedScreenData.entityData}
                sectionData={section}
                active={section.id === activeSection}
                completed={sectionStatus.completed}
              />
            );
          })}
        </YStack>
      </YStack>
      <XStack justifyContent={'center'}>
        <Card
          style={[styles.checkButtonCard, { backgroundColor }]}
          onPress={handleCheckButton}
        >
          <SizableText size='$6' style={styles.checkButtonCardText}>
            Prüfen
          </SizableText>
        </Card>
      </XStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    fontWeight: '400',
  },
  subTitleText: {
    color: 'black',
  },
  checkButtonCard: {
    flex: 1,
    padding: 16,
    backgroundColor: colorTokens.light.gray.gray8,
  },
  checkButtonCardText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default OnboardingSections;

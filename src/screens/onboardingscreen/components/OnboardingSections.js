import React from 'react';
import { StyleSheet } from 'react-native';
import { SizableText, XStack, YStack } from 'tamagui';
import OnboardingSectionItem from './OnboardingSectionItem';
import { useProfileInputSectionStore } from '../../../storage/zustand';

const OnboardingSections = ({ personalisedScreenData }) => {
  // zustand hooks
  const sections = useProfileInputSectionStore((state) => state.sections);

  // component
  return (
    <YStack gap={10}>
      <XStack justifyContent={'center'}>
        <SizableText size='$9' style={styles.titleText} flex={1}>
          Your profile
        </SizableText>
      </XStack>
      <YStack gap={16}>
        {personalisedScreenData.personalisedData.map((section, index) => {
          const sectionStatus = sections.filter((s) => s.id === section.id)[0];
          return (
            <OnboardingSectionItem
              key={index}
              title={section.title}
              id={section.id}
              active={sectionStatus.active}
              completed={sectionStatus.completed}
            />
          );
        })}
      </YStack>
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
});

export default OnboardingSections;

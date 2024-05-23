import React from 'react';
import { StyleSheet } from 'react-native';
import { SizableText, XStack, YStack } from 'tamagui';
import ProfileSectionItem from './ProfileSectionItem';
import { useProfileInputSectionStore } from '../../../storage/zustand';

const ProfileSections = ({ personalisedScreenData }) => {
  // zustand hooks
  const activeSection = useProfileInputSectionStore(
    (state) => state.activeSection
  );
  const completedSections = useProfileInputSectionStore(
    (state) => state.completedSections
  );

  // component
  return (
    <YStack gap={10}>
      <XStack justifyContent={'center'}>
        <SizableText size='$9' style={styles.titleText} flex={1}>
          Your profile
        </SizableText>
      </XStack>
      <YStack gap={16}>
        {personalisedScreenData.personalisedData.map((section, index) => (
          <ProfileSectionItem
            key={index}
            title={section.title}
            id={section.id}
            active={section.active}
            completed={completedSections.includes(section.id)}
          />
        ))}
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

export default ProfileSections;

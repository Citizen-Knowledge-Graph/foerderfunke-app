import React, { useMemo, useState, useEffect } from 'react';
import { Card, styled, Button, SizableText, View } from 'tamagui';
import { ChevronDown } from '@tamagui/lucide-icons';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetBackdrop,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { colorTokens } from '@tamagui/themes';
import { useUserUpdateStore } from '../../../storage/zustand';

const BottomView = ({ bottomSheetModalRef, currentEntry }) => {
  const [inputText, setInputText] = useState('');
  const updateUserField = useUserUpdateStore((state) => state.updateUserField);
  const snapPoints = useMemo(() => ['50%'], []);
  const { dismiss } = useBottomSheetModal();

  useEffect(() => {
    setInputText(currentEntry?.object?.value || '');
  }, [currentEntry?.object?.value]);

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView>
        <UpdateCard>
          <DismissButton onPress={() => dismiss()} />
          <UserProfile currentEntry={currentEntry} />
          <ProfileTextInput value={inputText} onChangeText={setInputText} />
          <UpdateButton
            onPress={() => {
              updateUserField(currentEntry.key, currentEntry.object, inputText);
              dismiss();
            }}
          />
        </UpdateCard>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const UpdateCard = styled(Card, {
  paddingVertical: 8,
  backgroundColor: 'white',
  borderRadius: 0,
  height: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

// Here we define small functional components for parts of our UI
const DismissButton = ({ onPress }) => (
  <Button
    size='$4'
    circular
    icon={<ChevronDown size='$2' />}
    onPress={onPress}
    marginVertical={16}
    backgroundColor={colorTokens.light.gray.gray8}
  />
);

const UserProfile = ({ currentEntry }) => (
  <>
    <SizableText size='$6' color='black' fontWeight='500'>
      Update your Userprofile
    </SizableText>
    <View borderBottomWidth={1}>
      <SizableText size='$6' color='black' marginTop={16}>
        {currentEntry?.displayName}
      </SizableText>
    </View>
  </>
);

const ProfileTextInput = ({ value, onChangeText }) => (
  <BottomSheetTextInput
    value={value}
    onChangeText={onChangeText}
    backgroundColor={colorTokens.light.gray.gray4}
    borderRadius={5}
    padding={16}
    minWidth={200}
    fontSize={18}
    marginVertical={16}
    textAlign='center'
  />
);

const UpdateButton = ({ onPress }) => (
  <Button
    size='$4'
    onPress={onPress}
    marginVertical={16}
    backgroundColor={colorTokens.light.purple.purple8}
    color={colorTokens.light.gray.gray1}
    fontSize={18}
  >
    Update
  </Button>
);

export default BottomView;

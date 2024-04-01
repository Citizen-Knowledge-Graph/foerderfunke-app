import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
import { performUpdate } from '../../../storage/actions/userReport';

const BottomView = ({ bottomSheetModalRef, currentEntry }) => {
  const [inputText, setInputText] = useState(currentEntry?.object.value);

  useEffect(() => {
    setInputText(currentEntry?.object.value);
  }, [currentEntry]);

  const dispatch = useDispatch();

  const snapPoints = useMemo(() => ['50%'], []);
  const { dismiss } = useBottomSheetModal();

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView>
        <UpdateCard>
          <Button
            size="$4"
            circular
            icon={<ChevronDown size="$2" />}
            onPress={() => dismiss()}
            marginVertical={16}
            backgroundColor={colorTokens.light.gray.gray8}
          />
          <SizableText size="$6" color={'black'} fontWeight={'500'}>
            Update your Userprofile
          </SizableText>
          <View borderBottomWidth={1}>
            <SizableText size="$6" color={'black'} marginTop={16}>
              {currentEntry?.displayName}
            </SizableText>
          </View>
          <BottomSheetTextInput
            backgroundColor={colorTokens.light.gray.gray4}
            borderRadius={5}
            padding={16}
            minWidth={200}
            fontSize={18}
            marginVertical={16}
            textAlign="center"
            onChangeText={(text) => setInputText(text)}
          >
            {currentEntry?.object?.value}
          </BottomSheetTextInput>
          <Button
            size="$4"
            onPress={() => {
              dispatch(performUpdate(currentEntry, inputText));
              dismiss();
            }}
            marginVertical={16}
            backgroundColor={colorTokens.light.purple.purple8}
            color={colorTokens.light.gray.gray1}
            fontSize={18}
          >
            Update
          </Button>
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

export default BottomView;

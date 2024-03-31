import React, { useMemo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Card, styled, Button, SizableText, View } from 'tamagui';
import { ChevronDown } from '@tamagui/lucide-icons';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetBackdrop,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';

const BottomView = ({ bottomSheetModalRef }) => {
  // variables
  const snapPoints = useMemo(() => ['65%'], []);
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
          <Button onPress={() => dismiss()} backgroundColor="orange">
            Close
          </Button>
          <SizableText color={'black'}>Awesome 🎉</SizableText>
          <BottomSheetTextInput>Here</BottomSheetTextInput>
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
});

export default BottomView;

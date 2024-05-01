import React from 'react';
import { RadioGroup, XStack, YStack, SizableText } from 'tamagui';

const ObjectInput = ({ setInputData }) => (
  <RadioGroup name='form'>
    <YStack alignItems='flex-start' gap='$5'>
      <RadioItem value='yes' id='1' label='Yes' />
      <RadioItem value='no' id='2' label='No' />
    </YStack>
  </RadioGroup>
);

const RadioItem = ({ value, id, label }) => {
  return (
    <XStack alignItems='flex-start' gap='$5'>
      <RadioGroup.Item value={value} id={id} size='$5'>
        <RadioGroup.Indicator />
      </RadioGroup.Item>
      <SizableText color={'black'} size='$5'>
        {label}
      </SizableText>
    </XStack>
  );
};

export default ObjectInput;

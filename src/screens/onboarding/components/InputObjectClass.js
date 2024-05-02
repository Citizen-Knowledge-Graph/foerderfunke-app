import React from 'react';
import { RadioGroup, XStack, YStack, SizableText } from 'tamagui';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

const ObjectInput = ({ setInputData, objectClass }) => {
  const handleValueChange = (value) => {
    if (value) {
      const objectId = objectClass.toLowerCase() + '_' + nanoid(4);
      setInputData(objectId);
      console.log('Value:', objectId);
    } else {
      setInputData(null);
    }
  };

  return (
    <RadioGroup onValueChange={handleValueChange} name='form'>
      <YStack alignItems='flex-start' gap='$5'>
        <RadioItem value={objectClass} id='1' label='Yes' />
        <RadioItem value={null} id='2' label='No' />
      </YStack>
    </RadioGroup>
  );
};

const RadioItem = ({ value, id, label }) => {
  return (
    <XStack alignItems='flex-start' gap='$5'>
      <RadioGroup.Item
        backgroundColor={'white'}
        value={value}
        id={id}
        size='$5'
      >
        <RadioGroup.Indicator backgroundColor={'black'} />
      </RadioGroup.Item>
      <SizableText color={'black'} size='$5'>
        {label}
      </SizableText>
    </XStack>
  );
};

export default ObjectInput;

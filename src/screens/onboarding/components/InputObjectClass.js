import React, { useState } from 'react';
import { RadioGroup, XStack, YStack, SizableText, View, Button } from 'tamagui';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { Plus, Minus } from '@tamagui/lucide-icons';
import { colorTokens } from '@tamagui/themes';

const ObjectInput = ({ setInputData, objectClass }) => {
  const [counter, setCounter] = useState(0);

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
    <YStack>
      <XStack
        backgroundColor={colorTokens.light.purple.purple6}
        padding={10}
        borderRadius={10}
        gap={20}
        width={150}
        justifyContent={'space-between'}
      >
        <Button
          width={24}
          height={24}
          backgroundColor={'white'}
          icon={<Minus size='$1' color={'black'} />}
          onPress={() => {
            if (counter > 0) {
              setCounter(counter - 1);
            }
          }}
        />
        <SizableText color={'black'}>{counter}</SizableText>
        <Button
          width={24}
          height={24}
          backgroundColor={'white'}
          icon={<Plus size='$1' color={'black'} />}
          onPress={() => setCounter(counter + 1)}
        />
      </XStack>
    </YStack>
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

import React, { useState, useEffect } from 'react';
import { XStack, YStack, SizableText, Button } from 'tamagui';
import 'react-native-get-random-values';
import { Plus, Minus } from '@tamagui/lucide-icons';
import { colorTokens } from '@tamagui/themes';

const ObjectInput = ({ setInputData }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setInputData(counter);
  }, [counter, setInputData]);

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

export default ObjectInput;

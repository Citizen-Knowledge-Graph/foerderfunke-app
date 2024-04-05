import React, { useMemo, useState } from 'react';
import {
  View,
  SizableText,
  Select,
  Adapt,
  Sheet,
  YStack,
  getFontSize,
} from 'tamagui';
import { colorTokens } from '@tamagui/themes';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { LinearGradient } from 'react-native-svg';

const items = [
  { name: 'Apple' },
  { name: 'Pear' },
  { name: 'Blackberry' },
  { name: 'Peach' },
  { name: 'Apricot' },
  { name: 'Melon' },
  { name: 'Honeydew' },
  { name: 'Starfruit' },
  { name: 'Blueberry' },
  { name: 'Raspberry' },
  { name: 'Strawberry' },
  { name: 'Mango' },
  { name: 'Pineapple' },
  { name: 'Lime' },
  { name: 'Lemon' },
  { name: 'Coconut' },
  { name: 'Guava' },
  { name: 'Papaya' },
  { name: 'Orange' },
  { name: 'Grape' },
  { name: 'Jackfruit' },
  { name: 'Durian' },
];

const UserSelection = ({ alternativeUserProfiles }) => {
  return (
    <SelectDemoItem
      id='select-demo-1'
      alternativeUserProfiles={alternativeUserProfiles}
    />
  );
};

export function SelectDemoItem(props) {
  console.log('alternativeUserProfiles here');
  const [val, setVal] = useState(null);

  return (
    <Select
      value={val}
      onValueChange={setVal}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger
        iconAfter={<ChevronDown size='$1' color={'black'} />}
        style={styles.userSelectionHeaderView}
      >
        <Select.Value
          placeholder='Select a different User Profile'
          style={styles.userSelectionTrigger}
        />
      </Select.Trigger>

      <Adapt platform='touch'>
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation='lazy'
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems='center'
          justifyContent='center'
          position='relative'
          width='100%'
          height='$2'
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', 'transparent']}
            borderRadius='$4'
          />
        </Select.ScrollUpButton>

        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                props.alternativeUserProfiles.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item}
                      value={item.toLowerCase()}
                    >
                      <Select.ItemText>{item}</Select.ItemText>
                      <Select.ItemIndicator marginLeft='auto'>
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [props.alternativeUserProfiles]
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position='absolute'
              right={0}
              top={0}
              bottom={0}
              alignItems='center'
              justifyContent='center'
              width={'$4'}
              pointerEvents='none'
            >
              <ChevronDown size={getFontSize(props.size ?? '$true')} />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems='center'
          justifyContent='center'
          position='relative'
          width='100%'
          height='$3'
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['transparent', '$background']}
            borderRadius='$4'
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}

export default UserSelection;
const styles = {
  userSelectionHeaderView: {
    padding: 12,
    marginTop: 20,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 0,
    backgroundColor: colorTokens.light.purple.purple4,
  },
  userSelectionTrigger: {
    color: 'black',
    fontWeight: '600',
  },
};

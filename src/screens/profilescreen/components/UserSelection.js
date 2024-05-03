import React, { useState } from 'react';
import { Select, Adapt, Sheet } from 'tamagui';
import { colorTokens } from '@tamagui/themes';
import { Check, ChevronDown } from '@tamagui/lucide-icons';
import { useUserStore } from '../../../storage/zustand';

const UserSelection = ({ alternativeUserProfiles }) => {
  const userId = useUserStore((state) => state.userId);

  return (
    <SelectDemoItem
      id='select-demo-1'
      selectedUser={userId}
      alternativeUserProfiles={alternativeUserProfiles}
    />
  );
};

export function SelectDemoItem(props) {
  const { userId, updateUserId } = useUserStore();
  const [val, setVal] = useState(userId);

  return (
    <Select
      value={val}
      onValueChange={(value) => {
        setVal(value);
        updateUserId(value);
      }}
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
          snapPoints={[50]}
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
        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Label>User Profile</Select.Label>
            {props.alternativeUserProfiles.map((item, i) => {
              return (
                <Select.Item index={i} key={item} value={item.toLowerCase()}>
                  <Select.ItemText>{item}</Select.ItemText>
                  <Select.ItemIndicator marginLeft='auto'>
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Viewport>
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

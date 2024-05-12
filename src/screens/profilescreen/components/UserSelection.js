import React, { useState } from 'react';
import { SizableText, View } from 'tamagui';
import { colorTokens } from '@tamagui/themes';
import { useUserStore } from '../../../storage/zustand';
import DropDownPicker from 'react-native-dropdown-picker';

export const UserSelection = ({ alternativeUserProfiles }) => {
  const { userId, updateUserId } = useUserStore();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(userId);
  const [items, setItems] = useState(
    alternativeUserProfiles.map((obj) => ({
      label: obj,
      value: obj,
    }))
  );

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
      }}
    >
      <SizableText>Select a different user profile</SizableText>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={(item) => {
          updateUserId(item.value);
        }}
        listMode='SCROLLVIEW'
      />
    </View>
  );
};

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

import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { View } from 'tamagui';

export const StringInput = ({ setInputData }) => (
  <TextInput
    width={'100%'}
    style={styles.inputField}
    onChangeText={setInputData}
  />
);

export const IntegerInput = ({ setInputData }) => {
  const handleTextChange = (text) => {
    if (/^\d*$/.test(text)) {
      setInputData(text);
    }
  };

  return (
    <TextInput
      width={'100%'}
      style={styles.inputField}
      onChangeText={handleTextChange}
      keyboardType='numeric'
      placeholder='Enter an integer'
    />
  );
};

export const SelectInput = ({ options, setInputData }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    options.map((obj) => ({
      label: obj.item,
      value: obj.item,
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
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={(item) => {
          setInputData(item.value);
        }}
        listMode='SCROLLVIEW'
      />
    </View>
  );
};

export const DateInput = ({ setInputData }) => {
  const [date, setDateInternal] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // getMonth() returns 0-11; add 1 for 1-12
    const day = currentDate.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    setDateInternal(currentDate);
    setInputData(formattedDate);
  };

  return (
    <DateTimePicker
      testID='dateTimePicker'
      value={date}
      mode='date'
      is24Hour={true}
      display='default'
      onChange={onChange}
    />
  );
};

const styles = StyleSheet.create({
  inputField: {
    height: 40,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
  },
});

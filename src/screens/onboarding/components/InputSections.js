import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Adapt, Button, Select, Sheet, View } from 'tamagui';
import { Check, ChevronDown } from '@tamagui/lucide-icons';

export const StringInput = ({ setInputData }) => (
  <TextInput size='$4' style={styles.inputField} onChangeText={setInputData} />
);

export const IntegerInput = ({ setInputData }) => {
  const handleTextChange = (text) => {
    if (/^\d*$/.test(text)) {
      setInputData(text);
    }
  };

  return (
    <TextInput
      size='$4'
      style={styles.inputField}
      onChangeText={handleTextChange}
      keyboardType='numeric'
      placeholder='Enter an integer'
    />
  );
};

export const SelectInput = ({ setInputData }) => {
  const testList = ['option1', 'option2'];

  return (
    <Select defaultValue=''>
      <Select.Trigger iconAfter={<ChevronDown size='$1' color={'white'} />}>
        <Select.Value placeholder='Select...' />
      </Select.Trigger>

      <Adapt>
        {/* or <Select.Sheet> */}
        <Sheet>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Group>
            <Select.Label />
            {testList.map((item, i) => {
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
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  );
};

export const DateInput = ({ setInputData }) => {
  const [date, setDateInternal] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // Keep the picker open on iOS
    setDateInternal(currentDate);
    setInputData(currentDate); // Assuming setDate is a prop for lifting state up
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View>
      <View style={styles.button}>
        <Button onPress={() => showMode('date')} title='Show Date Picker' />
      </View>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
    </View>
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

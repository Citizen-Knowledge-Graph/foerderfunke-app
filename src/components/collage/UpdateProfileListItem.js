import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import ModalUpdateButton from '../generic/ModalUpdateButton';

const UpdateProfileListItem = ({category, value, setUpdateValue}) => {
  const [inputText, setInputText] = useState(value);

  return (
    <View style={styles.container}>
      <Text style={styles.updateTitle}>New {category}</Text>
      <View style={styles.updateContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setInputText(text)}
          value={inputText}
          placeholder="Enter new value"
        />
      </View>
      <ModalUpdateButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
  },
  updateTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateContainer: {
    marginTop: 16,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#8e8e93',
    borderRadius: 5,
  },
  categoryContainer: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  valueContainer: {
    color: 'black',
    fontSize: 18,
  },
});

export default UpdateProfileListItem;

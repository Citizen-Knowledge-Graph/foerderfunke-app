import React, { useEffect, useState } from 'react';
import {
  StringInput,
  IntegerInput,
  DateInput,
  SelectInput,
} from './ProfileInputTypes';
import { SizableText } from 'tamagui';
import ObjectInput from './InputObjectClass';

const ProfileInputField = ({ item, setInputFieldData }) => {
  const [inputData, setInputData] = useState(item.displayData.value);
  const { datatype, options } = item.inputData;
  const { id, type } = item.entityData;

  useEffect(() => {
    if (inputData !== undefined) {
      setInputFieldData((prev) => {
        // Find the index of the existing entry
        const index = prev.findIndex(
          (entry) => entry.datafield === item.entityData.datafield
        );

        // Create the new entry
        const newEntry = {
          datafield: item.entityData.datafield,
          value: inputData,
          entityData: item.entityData,
          parentData: item.parentData,
        };

        // If the entry exists, update it
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = newEntry;
          return updated;
        }

        // If the entry doesn't exist, add it
        return [...prev, newEntry];
      });
    }
  }, [id, inputData, item, setInputFieldData, type]);

  switch (datatype) {
    case 'class':
      return <ObjectInput setInputData={setInputData} />;
    case 'selection':
      return (
        <SelectInput
          title={item.title}
          options={options}
          inputData={inputData}
          setInputData={setInputData}
        />
      );
    case 'string':
      return <StringInput inputData={inputData} setInputData={setInputData} />;
    case 'integer':
      return <IntegerInput inputData={inputData} setInputData={setInputData} />;
    case 'date':
      return <DateInput inputData={inputData} setInputData={setInputData} />;
    default:
      return <SizableText color={'black'}>Unsupported data type</SizableText>;
  }
};

export default ProfileInputField;

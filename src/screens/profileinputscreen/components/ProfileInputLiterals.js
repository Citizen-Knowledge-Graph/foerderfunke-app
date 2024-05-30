import React, { useEffect, useState } from 'react';
import {
  StringInput,
  IntegerInput,
  DateInput,
  SelectInput,
} from './ProfileInputTypes';
import { SizableText } from 'tamagui';

const ProfileInputField = ({ item, setInputFieldData }) => {
  const [inputData, setInputData] = useState(item.displayData.value);
  const { datatype, options } = item.inputData;
  const { id, type } = item.entityData;

  useEffect(() => {
    if (inputData != null) {
      setInputFieldData((prev) => {
        const index = prev.findIndex(
          (entry) => entry.datafield === item.entityData.datafield
        );

        const newEntry = {
          datafield: item.entityData.datafield,
          value: inputData,
          entityData: item.entityData,
          parentData: item.parentData,
        };

        if (index !== -1) {
          const updated = [...prev];
          updated[index] = newEntry;
          return updated;
        }

        return [...prev, newEntry];
      });
    }
  }, [id, inputData, item, setInputFieldData, type]);

  switch (datatype) {
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

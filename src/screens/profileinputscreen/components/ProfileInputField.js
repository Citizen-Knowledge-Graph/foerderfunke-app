import React from 'react';
import {
  StringInput,
  IntegerInput,
  DateInput,
  SelectInput,
} from './ProfileInputTypes';
import { SizableText } from 'tamagui';

const ProfileInputField = ({ item, setInputData }) => {
  const { datatype, options } = item;

  switch (datatype) {
    case 'selection':
      return (
        <SelectInput
          title={item.title}
          options={options}
          setInputData={setInputData}
        />
      );
    case 'string':
      return <StringInput setInputData={setInputData} />;
    case 'integer':
      return <IntegerInput setInputData={setInputData} />;
    case 'date':
      return <DateInput setInputData={setInputData} />;
    default:
      return <SizableText color={'black'}>Unsupported data type</SizableText>;
  }
};

export default ProfileInputField;

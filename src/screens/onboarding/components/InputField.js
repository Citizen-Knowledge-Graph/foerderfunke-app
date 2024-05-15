import React from 'react';
import {
  StringInput,
  IntegerInput,
  DateInput,
  SelectInput,
} from './InputSections';
import ObjectInput from './InputObjectClass';
import { SizableText } from 'tamagui';

const InputField = ({ onboardingCard, setInputData }) => {
  const { datatype, options } = onboardingCard;

  // check for simple data types
  switch (datatype) {
    case 'selection':
      return (
        <SelectInput
          title={onboardingCard.title}
          options={options}
          setInputData={setInputData}
        />
      );
    case 'class':
      return <ObjectInput setInputData={setInputData} />;
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

export default InputField;

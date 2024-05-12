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
  const { datatype, options, objectClass } = onboardingCard;

  // check for selection
  if (options && options.length > 0) {
    return (
      <SelectInput
        title={onboardingCard.title}
        options={options}
        setInputData={setInputData}
      />
    );
  }

  // check for object class
  if (objectClass) {
    return (
      <ObjectInput setInputData={setInputData} objectClass={objectClass} />
    );
  }

  // check for simple data types
  switch (datatype) {
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

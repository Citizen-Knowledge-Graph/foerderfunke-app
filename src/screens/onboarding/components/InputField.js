import React from 'react';
import {
  StringInput,
  IntegerInput,
  DateInput,
  SelectInput,
} from './InputSections';
import { SizableText } from 'tamagui';

const InputField = ({ onboardingCard, setInputData }) => {
  // check for selection
  if (
    onboardingCard.inputConstraints?.possibleValues &&
    onboardingCard.inputConstraints?.possibleValues.length > 0
  ) {
    return (
      <SelectInput
        title={onboardingCard.title}
        options={onboardingCard.inputConstraints.possibleValues}
        setInputData={setInputData}
      />
    );
  }

  // check for object class
  if (
    onboardingCard.inputConstraints?.objectClass !== 'no object class provided'
  ) {
    return <SizableText color={'black'}>yes or no</SizableText>;
  }

  switch (onboardingCard.inputConstraints?.datatype) {
    case 'http://www.w3.org/2001/XMLSchema#string':
      return <StringInput setInputData={setInputData} />;
    case 'http://www.w3.org/2001/XMLSchema#integer':
      return <IntegerInput setInputData={setInputData} />;
    case 'http://www.w3.org/2001/XMLSchema#date':
      return <DateInput setInputData={setInputData} />;
    default:
      return <SizableText color={'black'}>Unsupported data type</SizableText>;
  }
};

export default InputField;

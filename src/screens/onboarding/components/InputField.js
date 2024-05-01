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
  const { datatype, possibleValues, objectClass } =
    onboardingCard.inputConstraints;

  // check for selection
  if (possibleValues && possibleValues.length > 0) {
    return (
      <SelectInput
        title={onboardingCard.title}
        options={possibleValues}
        setInputData={setInputData}
      />
    );
  }

  // check for object class
  if (objectClass !== 'no object class provided') {
    return (
      <ObjectInput setInputData={setInputData} objectClass={objectClass} />
    );
  }

  switch (datatype) {
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

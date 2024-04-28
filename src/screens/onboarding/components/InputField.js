import React from 'react';
import {
  StringInput,
  IntegerInput,
  DateInput,
  SelectInput,
} from './InputSections';
import { SizableText } from 'tamagui';

const InputField = ({ datatype, possibleValues, setInputData, title }) => {
  switch (datatype) {
    case 'http://www.w3.org/2001/XMLSchema#string':
      return <StringInput setInputData={setInputData} />;
    case 'http://www.w3.org/2001/XMLSchema#integer':
      return <IntegerInput setInputData={setInputData} />;
    case 'http://www.w3.org/2001/XMLSchema#date':
      return <DateInput setInputData={setInputData} />;
    default:
      if (possibleValues && possibleValues.length > 0) {
        return (
          <SelectInput
            title={title}
            options={possibleValues}
            setInputData={setInputData}
          />
        );
      }
      return <SizableText color={'black'}>Unsupported data type</SizableText>;
  }
};

export default InputField;

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
  const [inputData, setInputData] = useState();
  const { datatype, options } = item.inputData;
  const { id, type } = item.entityData;

  useEffect(() => {
    setInputFieldData((prev) => [
      ...prev,
      {
        datafield: item.datafield,
        entityId: id,
        entityType: type,
        inputData: inputData,
      },
    ]);
  }, [id, inputData, item, setInputFieldData, type]);

  switch (datatype) {
    case 'class':
      return <ObjectInput setInputData={setInputData} />;
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

import { useCallback } from 'react';
import { useUserUpdateStore } from '../../../storage/zustand';

function useAddProfileData(inputFieldData, profileInputFields) {
  const addUserField = useUserUpdateStore((state) => state.addUserField);
  const addNestedUserField = useUserUpdateStore(
    (state) => state.addNestedUserProfileField
  );

  return useCallback(() => {
    for (let inputData of inputFieldData) {
      const { datafield, value } = inputData;
      const currentInputField = profileInputFields.find(
        (card) => card.datafield === inputFieldData.datafield
      );
      const { group, id, datatype } = currentInputField;

      // we skip classes - they are only used to update onboarding flow
      if (datatype === 'class') {
        return;
      }

      // the default case
      addUserField(datafield, inputData);
    }
  }, [inputFieldData, profileInputFields, addUserField]);
}

export default useAddProfileData;

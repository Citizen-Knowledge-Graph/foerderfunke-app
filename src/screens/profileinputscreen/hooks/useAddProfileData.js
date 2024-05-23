import { useCallback } from 'react';
import { useUserUpdateStore } from '../../../storage/zustand';

function useAddProfileData(inputFieldData) {
  const addUserField = useUserUpdateStore((state) => state.addUserField);

  return useCallback(() => {
    console.log('hooke', inputFieldData);
    for (let [key, value] of Object.entries(inputFieldData)) {
      // the default case
      addUserField(key, value);
    }
  }, [inputFieldData, addUserField]);
}

export default useAddProfileData;

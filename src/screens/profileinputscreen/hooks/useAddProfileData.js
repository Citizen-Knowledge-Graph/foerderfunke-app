import { useCallback } from 'react';
import { useUserUpdateStore } from '../../../storage/zustand';

function useAddProfileData(inputFieldData) {
  const addUserField = useUserUpdateStore((state) => state.addUserField);

  return useCallback(() => {
    for (const entry of inputFieldData) {
      const { entityId, entityType, datafield, inputData } = entry;
      console.log('entry', entry);
      //addUserField(entityId, entityType, datafield, inputData);
    }
  }, [addUserField, inputFieldData]);
}

export default useAddProfileData;

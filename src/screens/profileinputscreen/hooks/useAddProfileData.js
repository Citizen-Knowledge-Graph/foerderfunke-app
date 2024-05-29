import { useCallback } from 'react';
import { UserStore } from '../../../models/user-model';
import { useUserStore } from '../../../storage/zustand';

function useAddProfileData(inputFieldData) {
  return useCallback(() => {
    const userId = useUserStore.getState().userId;
    return new Promise((resolve, reject) => {
      try {
        for (const entry of inputFieldData) {
          const { value, entityData, parentData } = entry;
          UserStore.setField(userId, value, entityData, parentData);
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }, [inputFieldData]);
}

export default useAddProfileData;

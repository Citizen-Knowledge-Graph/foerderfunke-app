import { useCallback } from 'react';

function useAddProfileData(inputData) {
  return useCallback(() => {
    console.log('adding new input data', inputData);
  }, [inputData]);
}

export default useAddProfileData;

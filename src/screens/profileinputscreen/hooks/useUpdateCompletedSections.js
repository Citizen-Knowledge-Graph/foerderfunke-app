import { useCallback } from 'react';
import { useProfileInputSectionStore } from '../../../storage/zustand';

const useUpdateCompletedSections = () => {
  const updateCompletedSections = useProfileInputSectionStore(
    (state) => state.updateCompletedSections
  );

  return useCallback(() => {
    updateCompletedSections();
  }, [updateCompletedSections]);
};

export default useUpdateCompletedSections;

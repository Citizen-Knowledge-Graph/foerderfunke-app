import { useCallback } from 'react';
import { useProfileInputSectionStore } from '../../../storage/zustand';

const useUpdateCompletedSections = (id) => {
  const updateCompletedSections = useProfileInputSectionStore(
    (state) => state.updateCompletedSections
  );

  return useCallback(() => {
    updateCompletedSections(id);
  }, [id, updateCompletedSections]);
};

export default useUpdateCompletedSections;

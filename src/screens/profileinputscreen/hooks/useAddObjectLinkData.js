import { useCallback } from 'react';

function useAddObjectLinkData(item, count) {
  return useCallback(() => {
    const entityId = item.entityData.datafield + '_' + count;
    const entityType = item.inputData.objectClass;
    const parentId = item.entityData.id;
    const parentType = item.entityData.type;

    const sectionData = {
      id: entityType,
      title: entityId,
    };

    const entityData = {
      id: entityId,
      type: entityType,
      parentId: parentId,
      parentType: parentType,
      parentDatafield: item.entityData.datafield,
    };

    return { sectionData, entityData };
  }, [item, count]);
}

export default useAddObjectLinkData;

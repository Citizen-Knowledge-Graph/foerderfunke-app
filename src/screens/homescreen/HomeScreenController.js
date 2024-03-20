import {readJson} from '../../api/filesystem/fileaccess/fileManagement';

export const fetchHomeScreenData = async validationState => {
  const registryPath = 'query-registry.json';
  const schemeRegistry = await readJson(registryPath);

  return Object.keys(validationState).map(key => {
    if (validationState[key].conforms) {
      return schemeRegistry[key];
    }
  });
};

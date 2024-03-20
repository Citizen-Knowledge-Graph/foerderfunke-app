import {readJson} from '../../utilities/fileManagement';

export const fetchHomeScreenData = async validationState => {
  const registryPath = 'query-registry.json';
  const schemeRegistry = await readJson(registryPath);

  return Object.keys(validationState)
    .map(key => {
      if (validationState[key].conforms) {
        console.log('this is fetched: ', schemeRegistry[key]);
        return schemeRegistry[key];
      }
    })
    .filter(item => item !== undefined);
};

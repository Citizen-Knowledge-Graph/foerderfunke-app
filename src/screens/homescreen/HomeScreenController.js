import {readJson} from '../../utilities/fileManagement';
import {HomeScreenData} from './HomeScreenModel';

export const fetchHomeScreenData = async validationState => {
  const registryPath = 'query-registry.json';
  const schemeRegistry = await readJson(registryPath);

  return Object.keys(validationState)
    .map(scheme => {
      if (validationState[scheme].conforms) {
        let newDataField = new HomeScreenData(scheme);
        newDataField.setTitle(schemeRegistry[scheme].title);
        newDataField.setDescription(schemeRegistry[scheme].description);
        console.log('new datafield: ', newDataField);
        return newDataField;
      }
    })
    .filter(item => item !== undefined);
};

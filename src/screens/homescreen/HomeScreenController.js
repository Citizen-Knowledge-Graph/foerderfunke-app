import {readJson} from '../../utilities/fileManagement';

// Data Definition
class SchemeData {
  constructor(key, data) {
    this.key = key;
    this.data = data;
  }
}

// Interfacte
export const fetchHomeScreenData = async validationState => {
  const registryPath = 'query-registry.json';
  const schemeRegistry = await readJson(registryPath);

  return Object.keys(validationState)
    .map(key => {
      if (validationState[key].conforms) {
        console.log('this is fetched: ', schemeRegistry[key]);
        return new SchemeData(key, schemeRegistry[key]);
      }
    })
    .filter(item => item !== undefined);
};

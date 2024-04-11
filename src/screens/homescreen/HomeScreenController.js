import { readJson } from '../../utilities/fileManagement';
import { HomeScreenData, SchemeData } from './HomeScreenModel';
import { getValidationState } from '../../storage/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchHomeScreenData = async () => {
  // retrieve validation state
  const validationState = getValidationState();

  const queryRegistryPath = await AsyncStorage.getItem('query-registry');
  const schemeRegistry = await readJson(queryRegistryPath);
  const homeScreenData = new HomeScreenData();

  Object.keys(validationState).map((scheme) => {
    let newScheme = new SchemeData(scheme);
    newScheme.setTitle(schemeRegistry[scheme].title);
    newScheme.setDescription(schemeRegistry[scheme].description);
    if (validationState[scheme].conforms) {
      homeScreenData.addEligible(newScheme);
    } else {
      homeScreenData.addNonEligible(newScheme);
    }
  });
  return homeScreenData;
};

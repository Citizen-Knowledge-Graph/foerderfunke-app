import { readJson } from '../../utilities/fileManagement';
import { HomeScreenData, SchemeData } from './HomeScreenModel';
import { getValidationState } from '../../storage/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ValidationResult } from '@foerderfunke/matching-engine';

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
    newScheme.setDetails(validationState[scheme].details);
    if (validationState[scheme].result === ValidationResult.ELIGIBLE) {
      homeScreenData.addEligible(newScheme);
    }
    if (validationState[scheme].result === ValidationResult.INELIGIBLE) {
      homeScreenData.addNonEligible(newScheme);
    }
    if (validationState[scheme].result === ValidationResult.UNDETERMINABLE) {
      homeScreenData.addMissingData(newScheme);
    }
  });
  return homeScreenData;
};

import { readJson } from '../../utilities/fileManagement';
import { HomeScreenData, SchemeData } from './HomeScreenModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ValidationResult } from '@foerderfunke/matching-engine';

export const fetchHomeScreenData = async (validateAllReport) => {
  const queryRegistryPath = await AsyncStorage.getItem('query-registry');
  const schemeRegistry = await readJson(queryRegistryPath);
  const homeScreenData = new HomeScreenData();
  const { missingUserInputsAggregated, reports } = validateAllReport;

  for (let report of reports) {
    let { rpUri, result, violations, missingUserInput } = report;
    let newScheme = new SchemeData(rpUri);
    const schemeData = schemeRegistry.filter(
      (scheme) => scheme.rpUri === rpUri
    );
    const { title, description } = schemeData[0];
    newScheme.setTitle(title);
    newScheme.setDescription(description);
    if (result === ValidationResult.ELIGIBLE) {
      newScheme.setDetails('');
      homeScreenData.addEligible(newScheme);
    }
    if (result === ValidationResult.INELIGIBLE) {
      newScheme.setDetails(JSON.stringify(violations));
      homeScreenData.addNonEligible(newScheme);
    }
    if (result === ValidationResult.UNDETERMINABLE) {
      newScheme.setDetails(JSON.stringify(missingUserInput));
      homeScreenData.addMissingData(newScheme);
    }
  }

  homeScreenData.setMissingUserInputsAggregated(missingUserInputsAggregated);
  return homeScreenData;
};

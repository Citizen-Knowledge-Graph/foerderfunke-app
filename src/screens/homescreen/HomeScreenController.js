import { readJson } from '../../utilities/fileManagement';
import { HomeScreenData, SchemeData } from './HomeScreenModel';
import { getValidationState } from '../../storage/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ValidationResult } from '@foerderfunke/matching-engine';

export const fetchHomeScreenData = async () => {
  // retrieve validation state
  const validationReports = getValidationState().payload.validateAllReport.reports;

  const queryRegistryPath = await AsyncStorage.getItem('query-registry');
  const schemeRegistry = await readJson(queryRegistryPath);
  const homeScreenData = new HomeScreenData();

  for (let report of validationReports) {
    let id = report.filename;
    let newScheme = new SchemeData(id);
    newScheme.setTitle(schemeRegistry[id].title);
    newScheme.setDescription(schemeRegistry[id].description);
    if (report.result === ValidationResult.ELIGIBLE) {
      newScheme.setDetails('');
      homeScreenData.addEligible(newScheme);
    }
    if (report.result === ValidationResult.INELIGIBLE) {
      newScheme.setDetails(JSON.stringify(report.violations));
      homeScreenData.addNonEligible(newScheme);
    }
    if (report.result === ValidationResult.UNDETERMINABLE) {
      newScheme.setDetails(JSON.stringify(report.missingUserInput));
      homeScreenData.addMissingData(newScheme);
    }
  }
  return homeScreenData;
};

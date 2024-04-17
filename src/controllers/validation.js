import { readFile, readJson } from '../utilities/fileManagement.js';
import {
  validateAll,
  validateUserProfile,
  ValidationResult,
} from '@foerderfunke/matching-engine';
import validationReportAction from '../storage/actions/validationReport';
import AsyncStorage from '@react-native-async-storage/async-storage';

// run validation
const runValidation = async (dispatch, selectedUser) => {
  // fetch selected user
  let userProfileExamplesPath = await AsyncStorage.getItem(
    'user-profile-examples'
  );
  const userProfilePath =
    userProfileExamplesPath + selectedUser.userId + '.ttl';
  const userProfileString = await readFile(userProfilePath);

  // fetch datafields and materialization
  const datafieldsPath = await AsyncStorage.getItem('datafields');
  const datafieldsString = await readFile(datafieldsPath);
  const materializationPath = await AsyncStorage.getItem('materialization');
  const materializationString = await readFile(materializationPath);

  if (!(await validateUserProfile(userProfileString, datafieldsString))) {
    console.error('Invalid user profile');
  }

  // load query registry
  const queryRegistryPath = await AsyncStorage.getItem('query-registry');
  const queryRegistry = await readJson(queryRegistryPath);
  let requirementProfilesPath = await AsyncStorage.getItem('requirement-profiles');

  // iterate through queries in registry
  let requirementProfiles = {};

  for (let queryId in queryRegistry) {
    if (!queryRegistry.hasOwnProperty(queryId)) {
      continue;
    }
    const queryPath = requirementProfilesPath + queryId + '.ttl';
    requirementProfiles[queryId] = await readFile(queryPath);
  }

  console.log('Running validations for:', Object.keys(requirementProfiles));

  let validateAllReport = await validateAll(
    userProfileString,
    requirementProfiles,
    datafieldsString,
    materializationString,
    false
  );

  for (let report of validateAllReport.reports) {
    let details = '';
    if (report.result === ValidationResult.INELIGIBLE) {
      details = JSON.stringify(report.violations);
    }
    if (report.result === ValidationResult.UNDETERMINABLE) {
      details = JSON.stringify(report.missingUserInput);
    }
    dispatch(validationReportAction(report.filename, report.result, details));
  }
};

export default runValidation;

import { readFile, readJson } from '../utilities/fileManagement.js';
import {
  validateAll,
  validateUserProfile,
} from '@foerderfunke/matching-engine';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValidationReportStore } from '../storage/zustand';

// run validation
const runValidation = async (userId) => {
  // fetch selected user
  // const userProfile = UserStore.retrieveUserData(userId);

  let userProfileExamplesPath = await AsyncStorage.getItem(
    'user-profile-examples'
  );
  const userProfilePath = userProfileExamplesPath + userId + '.ttl';
  const userProfileString = await readFile(userProfilePath);

  // fetch datafields and materialization
  // const dataFieldsString = DataFieldsStore.retrieveDataFields();

  const datafieldsPath = await AsyncStorage.getItem('datafields');
  const datafieldsString = await readFile(datafieldsPath);
  console.log(userProfileString);
  if (!(await validateUserProfile(userProfileString, datafieldsString))) {
    console.error('Invalid user profile');
  }

  // load query registry
  const queryRegistryPath = await AsyncStorage.getItem('query-registry');
  const queryRegistry = await readJson(queryRegistryPath);
  let requirementProfilesPath = await AsyncStorage.getItem(
    'requirement-profiles'
  );

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

  const materializationPath = await AsyncStorage.getItem('materialization');
  const materializationString = await readFile(materializationPath);

  let validateAllReport = await validateAll(
    userProfileString,
    requirementProfiles,
    datafieldsString,
    materializationString,
    false
  );

  useValidationReportStore.getState().updateValidationReport(validateAllReport);
};

export default runValidation;

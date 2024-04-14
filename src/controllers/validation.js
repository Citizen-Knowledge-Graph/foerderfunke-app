import { readFile, readJson } from '../utilities/fileManagement.js';
import {
  validateOne,
  validateUserProfile,
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
  let requirementProfiles = await AsyncStorage.getItem('requirement-profiles');

  // iterate through queries in registry
  for (let queryId in queryRegistry) {
    if (queryRegistry.hasOwnProperty(queryId)) {
      console.log('Running validation for:', queryId);

      const queryPath = requirementProfiles + queryId + '.ttl';
      const queryString = await readFile(queryPath);

      let report = await validateOne(
        userProfileString,
        queryString,
        datafieldsString,
        materializationString,
        false
      );
      dispatch(validationReportAction(queryId, report.result));
    }
  }
};

export default runValidation;

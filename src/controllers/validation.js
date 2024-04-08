import { readFile, readJson } from '../utilities/fileManagement.js';
import {
  validateOne,
  validateUserProfile,
} from '@foerderfunke/matching-engine';
import validationReportAction from '../storage/actions/validationReport';
import AsyncStorage from "@react-native-async-storage/async-storage";

// run validation
const runValidation = async (dispatch, selectedUser) => {
  // fetch selected user
  const userRegistryPath = 'user-registry.json';
  const userRegistry = await readJson(userRegistryPath);
  let userProfilePath;
  try {
    userProfilePath = userRegistry[selectedUser.userId].path;
  } catch (error) {
    console.error('User not found in registry:', selectedUser.userId);
  }

  const userProfileString = await readFile(userProfilePath);

  // fetch queries

  let datafieldsPath = await AsyncStorage.getItem('datafields-file');
  let materializationPath = await AsyncStorage.getItem('materialization-file');
  const queryRegistryPath = 'query-registry.json';
  const datafieldsString = await readFile(datafieldsPath);
  const materializationString = await readFile(materializationPath);

  if (!(await validateUserProfile(userProfileString, datafieldsString))) {
    console.error('Invalid user profile');
  }

  // load query registry
  const queryRegistry = await readJson(queryRegistryPath);
  let requirementProfilesFolder = await AsyncStorage.getItem(
    'requirement-profiles-folder'
  );

  // iterate through queries in registry
  for (let queryId in queryRegistry) {
    if (queryRegistry.hasOwnProperty(queryId)) {
      console.log('Running validation for:', queryId);

      const queryPath = requirementProfilesFolder + queryId + '.ttl';
      const queryString = await readFile(queryPath);

      let report = await validateOne(
        userProfileString,
        queryString,
        datafieldsString,
        materializationString,
        false
      );
      dispatch(validationReportAction(queryId, report.conforms));
    }
  }
};

export default runValidation;

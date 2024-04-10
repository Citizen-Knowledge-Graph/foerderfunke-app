import { readFile, readJson } from '../utilities/fileManagement.js';
import {
  validateOne,
  validateUserProfile,
} from '@foerderfunke/matching-engine';
import validationReportAction from '../storage/actions/validationReport';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

// run validation
const runValidation = async (dispatch, selectedUser) => {
  // fetch selected user
  let userProfileExamplesPath = await AsyncStorage.getItem(
    'user-profile-examples-folder'
  );
  const userProfilePath =
    userProfileExamplesPath + selectedUser.userId + '.ttl';
  const userProfileString = await readFile(userProfilePath);

  // fetch datafields and materialization
  const datafieldsPath = await AsyncStorage.getItem('datafields-file');
  const datafieldsString = await readFile(datafieldsPath);
  const materializationPath = await AsyncStorage.getItem(
    'materialization-file'
  );
  const materializationString = await readFile(materializationPath);

  if (!(await validateUserProfile(userProfileString, datafieldsString))) {
    console.error('Invalid user profile');
  }

  // fetch queries
  const requirementProfilesFolder = await AsyncStorage.getItem(
    'requirement-profiles-folder'
  );
  const queries = await FileSystem.readDirectoryAsync(
    FileSystem.documentDirectory + requirementProfilesFolder
  );

  // iterate through queries in registry
  for (let queryFile of queries) {
    console.log('Running validation for:', queryFile);

    const queryPath = requirementProfilesFolder + queryFile;
    const queryString = await readFile(queryPath);

    let report = await validateOne(
      userProfileString,
      queryString,
      datafieldsString,
      materializationString,
      false
    );
    dispatch(validationReportAction(queryFile, report.conforms));
  }
};

export default runValidation;

import { readFile, readJson } from '../utilities/fileManagement.js';
import {
  validateOne,
  validateUserProfile,
} from '@foerderfunke/matching-engine';
import validationReportAction from '../storage/actions/validationReport';

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
  const datafieldsPath = 'datafields.ttl';
  const materializationPath = 'materialization.ttl';
  const queryRegistryPath = 'query-registry.json';
  const datafieldsString = await readFile(datafieldsPath);
  const materializationString = await readFile(materializationPath);

  if (!(await validateUserProfile(userProfileString, datafieldsString))) {
    console.error('Invalid user profile');
  }

  // load query registry
  const queryRegistry = await readJson(queryRegistryPath);

  // iterate through queries gitregistry
  for (let key in queryRegistry) {
    if (queryRegistry.hasOwnProperty(key)) {
      console.log('Running validation for:', key);

      const queryPath = queryRegistry[key].path + '/' + key + '.ttl';
      const queryString = await readFile(queryPath);

      let report = await validateOne(
        userProfileString,
        queryString,
        datafieldsString,
        materializationString,
        false
      );
      dispatch(validationReportAction(key, report.conforms));
    }
  }
};

export default runValidation;

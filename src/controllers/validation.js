import { readFile, readJson } from '../utilities/fileManagement.js';
import validationReportAction from '../storage/actions/validationReport.js';
import {
  validateOne,
  validateUserProfile,
} from '@foerderfunke/matching-engine';

// run validation
const runValidation = async (dispatch) => {
  const userProfilePath = 'user-profile.ttl';
  const datafieldsPath = 'datafields.ttl';
  const materializationPath = 'materialization.ttl';
  const queryRegistryPath = 'query-registry.json';

  const userProfileString = await readFile(userProfilePath);
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

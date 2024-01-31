import rdfDataModel from '@rdfjs/data-model';
import Validator from 'shacl-engine/Validator.js';
import { readFile, readJson } from '../utilities/fileManagement.js';
import { parseTurtle } from '../utilities/rdfHandling.js';
import validationReportAction from '../storage/actions/validationReport.js';

/**
 * Create report for profile
 */
const createValidationReport = async (shapes, profile) => {
  const validator = new Validator(shapes, { factory: rdfDataModel });
  return await validator.validate({ dataset: profile });
};

// run validation
const runValidation = async dispatch => {

  // set up filepaths
  const userProfilePath = 'user-profile.ttl';
  const queryRegistryPath = 'query-registry.json';

  // load user profile to shapes
  const userProfileString = await readFile(userProfilePath);
  const userProfile = await parseTurtle(userProfileString);

  // load query registry
  const queryRegistry = await readJson(queryRegistryPath);

  // Iterate through registry
  for (let key in queryRegistry) {
    if (queryRegistry.hasOwnProperty(key)) {
      console.log('Running validation for: ', key);

      const constraintsPath = queryRegistry[key].path + "/" + key + ".ttl"
      const queryString = await readFile(constraintsPath)
      const queryProfile = await parseTurtle(queryString)
      const report = await createValidationReport(queryProfile, userProfile)
      dispatch(validationReportAction(key, report));
    }
  }
}

export default runValidation;

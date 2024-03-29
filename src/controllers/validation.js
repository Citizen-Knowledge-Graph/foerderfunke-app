import rdfDataModel from '@rdfjs/data-model';
import Validator from 'shacl-engine/Validator.js';
import {readFile, readJson} from '../utilities/fileManagement.js';
import {
  combineTurtleStringsIntoDataset,
  parseTurtle,
} from '../utilities/rdfHandling.js';
import validationReportAction from '../storage/actions/validationReport.js';
import { validateUserProfile } from '@foerderfunke/matching-engine';

/**
 * Create report for profile
 */
const createValidationReport = async (shapes, profile) => {
  const validator = new Validator(shapes, {factory: rdfDataModel});
  return await validator.validate({dataset: profile});
};

// run validation
const runValidation = async dispatch => {
  // set up filepaths
  const userProfilePath = 'user-profile.ttl';

  let report = validateUserProfile(userProfilePath);
  console.log(report);

  const enitityValidationRegistryPath = 'entity-registry.json';
  const queryRegistryPath = 'query-registry.json';

  // load user profile to shapes
  const userProfileString = await readFile(userProfilePath);
  const userProfile = await parseTurtle(userProfileString);

  // load user validation to shapes
  const enitityValidationRegistry = await readJson(
    enitityValidationRegistryPath,
  );

  // Iterate through entity registry
  const entityShapesArray = [];
  for (let key in enitityValidationRegistry) {
    if (enitityValidationRegistry.hasOwnProperty(key)) {
      const constraintsPath = enitityValidationRegistry[key].path;
      const entityString = await readFile(constraintsPath);
      entityShapesArray.push(entityString);
    }
  }

  // run validation for entity shapes
  const entityShapes = await combineTurtleStringsIntoDataset(entityShapesArray);
  const entityReport = await createValidationReport(entityShapes, userProfile);
  if (!entityReport.conforms) {
    console.error('Entity validation failed');
  }

  // load query registry
  const queryRegistry = await readJson(queryRegistryPath);

  // Iterate through queries gitregistry
  for (let key in queryRegistry) {
    if (queryRegistry.hasOwnProperty(key)) {
      console.log('Running validation for: ', key);

      const constraintsPath = queryRegistry[key].path + '/' + key + '.ttl';
      const queryString = await readFile(constraintsPath);
      const queryProfile = await parseTurtle(queryString);
      const report = await createValidationReport(queryProfile, userProfile);
      dispatch(validationReportAction(key, report));
    }
  }
};

export default runValidation;

import rdfDataModel from '@rdfjs/data-model';
import Validator from 'shacl-engine/Validator.js';
import { readFile, readJson } from '../utilities/fileManagement.js';
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
  const validator = new Validator(shapes, { factory: rdfDataModel });
  return await validator.validate({ dataset: profile });
};

// run validation
const runValidation = async (dispatch) => {
  const userProfilePath = 'user-profile.ttl';
  const datafieldsPath = 'datafields.ttl';
  const entityValidationRegistryPath = 'entity-registry.json';
  const queryRegistryPath = 'query-registry.json';

  const userProfileString = await readFile(userProfilePath);
  const datafieldsString = await readFile(datafieldsPath);

  let result = await validateUserProfile(userProfileString, datafieldsString);
  console.log(result);

  const userProfile = await parseTurtle(userProfileString);

  // load user validation to shapes
  const entityValidationRegistry = await readJson(
    entityValidationRegistryPath,
  );

  // iterate through entity registry
  const entityShapesArray = [];
  for (let key in entityValidationRegistry) {
    if (entityValidationRegistry.hasOwnProperty(key)) {
      const constraintsPath = entityValidationRegistry[key].path;
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

  // iterate through queries gitregistry
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

import { readFile, readJson } from '../utilities/fileManagement.js';
import validationReportAction from '../storage/actions/validationReport.js';
import { validateOne, validateUserProfile } from '@foerderfunke/matching-engine';

// run validation
const runValidation = async (dispatch) => {
  const userProfilePath = 'user-profile.ttl';
  const datafieldsPath = 'datafields.ttl';
  const materializationPath = 'materialization.ttl';
  // const entityValidationRegistryPath = 'entity-registry.json';
  const queryRegistryPath = 'query-registry.json';

  const userProfileString = await readFile(userProfilePath);
  const datafieldsString = await readFile(datafieldsPath);
  const materializationString = await readFile(materializationPath);

  if (!(await validateUserProfile(userProfileString, datafieldsString))) {
    console.error('Invalid user profile');
  }

  /*
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
  */

  // load query registry
  const queryRegistry = await readJson(queryRegistryPath);

  // iterate through queries gitregistry
  for (let key in queryRegistry) {
    if (queryRegistry.hasOwnProperty(key)) {
      console.log('Running validation for:', key);

      const queryPath = queryRegistry[key].path + '/' + key + '.ttl';
      const queryString = await readFile(queryPath);

      let report = await validateOne(userProfileString, queryString, datafieldsString, materializationString, false);
      dispatch(validationReportAction(key, report.conforms));
    }
  }
};

export default runValidation;

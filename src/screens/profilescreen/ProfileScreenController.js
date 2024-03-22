import {readFile, readJson, writeFile} from '../../utilities/fileManagement';
import {parseTurtle, serializeTurtle} from '../../utilities/rdfHandling';
import {
  getFirstAttributeValue,
  NamespacedTerm,
  updatePredicatedObject,
} from '../../utilities/graphManagement';
import {ProfileDataField} from './ProfileModel';

// config
const dataFields = [
  'name',
  'surname',
  'birthday',
  'residence',
  'drivers_license',
];

export const fetchProfileScreenData = async () => {
  //
  // fetch content information for each data field
  const userHydrationPath = 'user-profile-hydration.json';
  const userHydrationJson = await readJson(userHydrationPath);
  let data = dataFields.map(key => {
    const newDataField = new ProfileDataField(key);
    newDataField.setName(userHydrationJson[key].name);
    newDataField.setDisplayName(userHydrationJson[key].display_name);
    newDataField.setNamespace(userHydrationJson[key].namespace);
    return newDataField;
  });
  //
  // fetch user data from the user profile
  const userPath = 'user-profile.ttl';
  const userString = await readFile(userPath);
  const userGraph = await parseTurtle(userString);
  data = data.map(entry => {
    const value = getFirstAttributeValue(
      userGraph,
      entry.name,
      entry.namespace,
    );
    entry.setValue(value);
    return entry;
  });
  return data;
};

export const updateUserProfile = async (entry, updateValue) => {
  const userPath = 'user-profile.ttl';
  const userString = await readFile(userPath);
  const userGraph = await parseTurtle(userString);
  const updatedGraph = updatePredicatedObject(
    userGraph,
    new NamespacedTerm(entry.namespace, entry.key),
    initialValue,
    'replace',
    updateValue,
  );
  const updatedGraphString = await serializeTurtle(updatedGraph);
  console.log('new ttl: ', updatedGraphString);
  await writeFile('user-profile.tt', updatedGraphString);
};

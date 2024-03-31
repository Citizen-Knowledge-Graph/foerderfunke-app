import { readFile, readJson, writeFile } from '../../utilities/fileManagement';
import { parseTurtle, serializeTurtle } from '../../utilities/rdfHandling';
import { getFirstOut, updateOut } from '../../utilities/graphManagement';
import { ProfileDataField } from './ProfileScreenModel';
import { Share } from 'react-native';

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
  let data = dataFields.map((key) => {
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
  data = data.map((entry) => {
    entry.setObject(getFirstOut(userGraph, entry.name, entry.namespace));
    return entry;
  });
  return data;
};

export const updateUserProfile = async (entry, updateValue) => {
  const userPath = 'user-profile.ttl';
  const userString = await readFile(userPath);
  const userGraph = await parseTurtle(userString);
  const updatedGraph = updateOut(
    'replace',
    userGraph,
    entry.name,
    entry.namespace,
    entry.object,
    updateValue
  );
  const updatedGraphString = await serializeTurtle(updatedGraph);
  await writeFile('user-profile.ttl', updatedGraphString);
};

export const shareFile = async () => {
  const userProfilePath = 'user-profile.ttl';
  const userProfileString = await readFile(userProfilePath);
  try {
    await Share.share({
      message: userProfileString,
      title: 'User profile in turtle format',
    });
  } catch (err) {
    console.error(`Error sharing the content of ${userProfilePath}`, err);
  }
};

import { readFile, readJson, writeFile } from '../../utilities/fileManagement';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseTurtle, serializeTurtle } from '../../utilities/rdfHandling';
import { addOut } from '../../utilities/graphManagement';

export const fetchOnboardingScreenData = async () => {
  const onbardingCards = await readJson('onboarding-cards.json');
  return onbardingCards;
};

export const addUserProfileField = async (selectedUser, field, value) => {
  //
  // fetch user profile paths
  let userProfileExamplesPath = await AsyncStorage.getItem(
    'user-profile-examples'
  );
  const userProfilePath =
    userProfileExamplesPath + selectedUser.userId + '.ttl';

  const userString = await readFile(userProfilePath);
  const userGraph = await parseTurtle(userString);
  const updatedGraph = addOut(userGraph, field, value);
  const updatedGraphString = await serializeTurtle(updatedGraph);
  console.log('new graph', updatedGraphString);
  await writeFile(userProfilePath, updatedGraphString);
};

import { readJson } from '../utilities/fileManagement';
import store from '../storage/store';

const fetchHydrationData = async (key) => {

  // load registry from redux
  const state = store.getState();
  const queriesState = state.queriesReducer;

  // build path
  const hydrationPath = `${queriesState["query-registry"][key].path}/${key}-hydration.json`;

  // read in data
  return await readJson(hydrationPath);
}

export default fetchHydrationData;
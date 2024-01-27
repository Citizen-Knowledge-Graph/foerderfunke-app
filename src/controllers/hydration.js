import { readJson } from '../utilities/fileManagement';
import store from '../storage/store';

const fetchHydrationData = async (key) => {

  // load registry from redux
  const state = store.getState();
  const registryState = state.registryReducer;

  // build path
  const hydrationPath = `${registryState["query-registry"][key].path}/${key}-hydration.json`;

  // read in data
  return await readJson(hydrationPath);
}

export default fetchHydrationData;
import { readJson } from '../utilities/fileManagement';
import store from '../storage/store';

const fetchHydrationData = async (key, hydrationType) => {

  // load registry from redux
  const state = store.getState();

  let hydrationPath;
  switch (hydrationType) {
    case "GUIDE":
      hydrationPath = buildGuidesPath(state, key);
      break;
    case "QUERY":
      hydrationPath = buildQueriesPath(state, key);
      break;
    default:
      console.error(`Received invalid hydration type: ${hydrationType}`)
  }

  // read in data
  return await readJson(hydrationPath);
}

const buildQueriesPath = (state, key) => {
  const registry = state.queriesReducer["query-registry"]
  return `${registry[key].path}/${key}-hydration.json`;
}

const buildGuidesPath = (state, key) => {
  const registry = state.guidesReducer["guides-registry"]
  return `${registry[key].path}/${key}-hydration.json`;
}

export default fetchHydrationData;
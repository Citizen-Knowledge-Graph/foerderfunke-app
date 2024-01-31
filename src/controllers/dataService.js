import queriesReportAction from '../storage/actions/queriesReport';
import guidesReportAction from '../storage/actions/guidesReport';
import userReportAction from '../storage/actions/userReport';
import {readFile, readJson} from '../utilities/fileManagement';
import {parseTurtle} from '../utilities/rdfHandling';

const loadUserProfile = async dispatch => {
  // file configuration
  const userProfilePath = 'user-profile.ttl';

  // load user profile into shapes
  const userProfileString = await readFile(userProfilePath);
  const userProfile = await parseTurtle(userProfileString);

  // load registry into redux store
  dispatch(userReportAction(userProfilePath.replace('.ttl', ''), userProfile));
};

const loadQueryRegistry = async dispatch => {
  // file configuration
  const registryPath = 'query-registry.json';

  // load into json
  const registryJson = await readJson(registryPath);

  // load registry into redux store
  dispatch(
    queriesReportAction(registryPath.replace('.json', ''), registryJson),
  );
};

const loadGuidesRegistry = async dispatch => {
  // file configuration
  const guidesPath = 'guides-registry.json';

  // load into json
  const guidesJson = await readJson(guidesPath);

  // load registry into redux store
  dispatch(guidesReportAction(guidesPath.replace('.json', ''), guidesJson));
};

const loadDataIntoRedux = async dispatch => {
  // load user profile
  //await loadUserProfile(dispatch);

  // load query registry
  await loadQueryRegistry(dispatch);

  // load guides registry
  await loadGuidesRegistry(dispatch);
};

export default loadDataIntoRedux;

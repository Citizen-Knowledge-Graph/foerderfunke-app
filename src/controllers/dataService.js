import queriesReportAction from '../storage/actions/queriesReport';
import guidesReportAction from '../storage/actions/guidesReport';
import { readJson } from '../utilities/fileManagement';

const loadQueryRegistry = async dispatch => {
  // file configuration
  const registryPath = 'query-registry.json';

  // load into json
  const registryJson = await readJson(registryPath);

  // load registry into redux store
  dispatch(
    queriesReportAction(registryPath.replace('.json', ''), registryJson),
  );
}

const loadGuidesRegistry = async dispatch => {
  // file configuration
  const guidesPath = 'guides-registry.json';

  // load into json
  const guidesJson = await readJson(guidesPath);

  // load registry into redux store
  dispatch(
    guidesReportAction(guidesPath.replace('.json', ''), guidesJson),
  );
}

const loadDataIntoRedux = async dispatch => {

  // load query registry
  await loadQueryRegistry(dispatch);

  // load guides registry
  await loadGuidesRegistry(dispatch);

};

export default loadDataIntoRedux;

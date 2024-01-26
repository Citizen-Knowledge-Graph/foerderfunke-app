import registryReportAction from '../storage/actions/registryReport';
import {readJson} from '../utilities/fileManagement';

const loadDataIntoRedux = async dispatch => {
  // file configuration
  const registryPath = 'query-registry.json';

  // load into json
  const registryJson = await readJson(registryPath);

  // load registry into redux store
  dispatch(
    registryReportAction(registryPath.replace('.json', ''), registryJson),
  );
};

export default loadDataIntoRedux;

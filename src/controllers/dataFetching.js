import {
  writeFile,
  fetchZipAssetFromModule,
  deleteAllFiles,
  listAllFiles,
} from '../utilities/fileManagement';
import {
  fetchLatestCommitHash,
  fetchZipAssetFromRepository,
} from '../utilities/gitManagement';
import { unzipFromBase64 } from '../utilities/zipHandling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { runSparqlSelectQueryOnRdfString } from '@foerderfunke/matching-engine/src/utils';

const fetchDataToDevice = async () => {
  console.log('Fetching data from local assets');
  await fetchLocalData();
  console.log('Fetching data from remote repo');
  await fetchRemoteData();
  console.log('All files in app storage:', await listAllFiles(true));
};

const fetchLocalData = async () => {
  let binaryData = await fetchZipAssetFromModule(
    require('../../assets/data.zip')
  );
  let unzippedData = await unzipFromBase64(binaryData);
  for (const file of unzippedData) {
    await writeFile(file.filename, file.fileContent, true);
  }
};

const fetchRemoteData = async () => {
  const repo = 'Citizen-Knowledge-Graph/requirement-profiles';
  const archivePath = 'zip-archive/archive.zip';

  const latestCommit = await fetchLatestCommitHash(repo);
  let storedLatestCommit = await AsyncStorage.getItem('latest-commit-stored');
  if (storedLatestCommit === null || storedLatestCommit !== latestCommit) {
    console.log('Data needs to be updated');

    const binaryData = await fetchZipAssetFromRepository(repo, archivePath);
    let unzippedData = await unzipFromBase64(binaryData);
    for (const file of unzippedData) {
      console.log('Writing file:', file.filename);
      await writeFile(file.filename, file.fileContent, true);
      if (file.filename === 'manifest.ttl') {
        await storeIdToPathPairs(file.fileContent);
      }
    }

    await AsyncStorage.setItem('latest-commit-stored', latestCommit);
  } else {
    console.log('Data already up to date');
  }
};

const storeIdToPathPairs = async (manifestContent) => {
  let query = `
    PREFIX ff: <https://foerderfunke.org/default#>
    PREFIX schema: <http://schema.org/>
    SELECT ?id ?path WHERE {
        ?doc a ?type ;
             schema:identifier ?id ;
             ff:relativePath ?path .
    }`;
  let pairs = await runSparqlSelectQueryOnRdfString(query, manifestContent);
  for (let pair of pairs) {
    console.log('Storing:', pair.id, pair.path);
    await AsyncStorage.setItem(pair.id, pair.path);
  }
};

export default fetchDataToDevice;

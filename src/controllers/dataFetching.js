import Config from 'react-native-config';
import {
  writeFile,
  fetchZipAssetFromModule,
  fetchZipAssetFromFileUri,
  deleteAllFiles,
  listAllFiles,
} from '../utilities/fileManagement';
import {
  fetchLatestCommitHash,
  downloadRepoArchive,
} from '../utilities/gitManagement';
import { unzipFromBase64 } from '../utilities/zipHandling';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { runSparqlSelectQueryOnRdfString } from '@foerderfunke/matching-engine/src/utils';

const fetchDataToDevice = async () => {
  if (Config.REACT_APP_CONFIG_MODE === 'offline') {
    console.log('Fetching data from local assets');
    await fetchLocalData();
  } else {
    console.log('Fetching data from remote repo');
    await fetchRemoteData();
  }
  console.log('All files in app storage:', await listAllFiles(true));
};

const fetchLocalData = async () => {
  await deleteAllFiles();
  let binaryData = await fetchZipAssetFromModule(
    require('../../assets/data.zip')
  );
  let unzippedData = await unzipFromBase64(binaryData);
  for (const file of unzippedData) {
    await writeFile(file.filename, file.fileContent, true);
  }
};

const fetchRemoteData = async () => {
  const repoUrl =
    'https://api.github.com/repos/Citizen-Knowledge-Graph/requirement-profiles';
  const latestCommit = await fetchLatestCommitHash(repoUrl);
  let storedLatestCommit = await AsyncStorage.getItem('latest-commit-stored');
  if (storedLatestCommit === null || storedLatestCommit !== latestCommit) {
    await deleteAllFiles();
    await downloadAndUnpackRepo(repoUrl);
    await AsyncStorage.setItem('latest-commit-stored', latestCommit);
  }
};

const downloadAndUnpackRepo = async (repoUrl) => {
  const actualLocation = await downloadRepoArchive(repoUrl);

  let binaryData = await fetchZipAssetFromFileUri(actualLocation);
  let unzippedData = await unzipFromBase64(binaryData);

  console.log('Adding files from repo main.zip:');
  for (const file of unzippedData) {
    if (!file.filename.endsWith('.ttl')) {
      continue;
    }
    let filename = file.filename.split('/').slice(1).join('/'); // remove "requirement-profiles-main/" from the beginning
    await writeFile(filename, file.fileContent, true);
    if (filename === 'manifest.ttl') {
      await storeIdToPathPairs(file.fileContent);
    }
  }

  // delete main.zip
  await FileSystem.deleteAsync(actualLocation);
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
    await AsyncStorage.setItem(pair.id, pair.path);
  }
};

export default fetchDataToDevice;

import {
  writeFile,
  fetchZipAssetFromModule,
  fetchZipAssetFromFileUri,
  deleteAllFiles,
  listAllFiles,
} from '../utilities/fileManagement';
import {
  fetchLatestCommitHash,
  downloadRepoZip,
} from '../utilities/gitManagement';
import { unzipFromBase64 } from '../utilities/zipHandling';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { runSparqlSelectQueryOnRdfString } from '@foerderfunke/matching-engine/src/utils';

const fetchDataToDevice = async () => {
  // 1. Delete all files: clean slate
  await deleteAllFiles();

  // 2. Unpack local data.zip
  let binaryData = await fetchZipAssetFromModule(
    require('../../assets/data.zip')
  );
  let unzippedData = await unzipFromBase64(binaryData);
  console.log('Adding files from data.zip:');
  for (const file of unzippedData) {
    await writeFile(file.filename, file.fileContent, true);
  }

  // 3. Download from requirement-profiles repo
  const latestCommit = await fetchLatestCommitHash(
    'https://api.github.com/repos/Citizen-Knowledge-Graph/requirement-profiles/commits?per_page=1'
  );
  let storedLatestCommit = await AsyncStorage.getItem(
    'requirement-profiles-repo-latest-commit'
  );
  if (storedLatestCommit === null || storedLatestCommit !== latestCommit) {
    await downloadAndUnpackRequirementsProfileRepo();
    await AsyncStorage.setItem(
      'requirement-profiles-repo-latest-commit',
      latestCommit
    );
  }
  console.log('All files in app storage:', await listAllFiles(true));
};

const downloadAndUnpackRequirementsProfileRepo = async () => {
  const downloadUrl =
    'https://github.com/Citizen-Knowledge-Graph/requirement-profiles/archive/main.zip';
  const actualLocation = await downloadRepoZip(downloadUrl);

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

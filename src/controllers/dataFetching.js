import {
  writeFile,
  fetchZipAssetFromModule,
  fetchZipAssetFromFileUri,
  listAllFiles,
  deleteAllFiles,
} from '../utilities/fileManagement';
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

  // 3. Download from requirement-profiles repo OR update/add/delete files that changed since we last checked

  await downloadAndUnpackRequirementsProfileRepo();

  let storedLatestCommit = await AsyncStorage.getItem('requirement-profiles-repo-latest-commit');
  if (storedLatestCommit == null) {
    // await downloadAndUnpackRequirementsProfileRepo();
    // store latest commit TODO
  } else {
    // check if latest commit is different to stored one, if yes, extract changed files and download them one by one
    /*
    url = `https://api.github.com/repos/Citizen-Knowledge-Graph/requirement-profiles/compare/${firstCommit}...${latestCommit}`;
    response = await fetch(url);
    let changedFiles = (await response.json()).files.map(file => ({
      filename: file.filename,
      status: file.status,
    }));
    changedFiles = changedFiles.filter((file) => file.filename.endsWith('.ttl'));
    // TODO
    */
  }
  let commitsUrl = 'https://api.github.com/repos/Citizen-Knowledge-Graph/requirement-profiles/commits?per_page=1';
  let response = await fetch(commitsUrl);
  let latestCommit = (await response.json()).map((commit) => commit.sha)[0];
  console.log('Latest commit:', latestCommit);
  await AsyncStorage.setItem('requirement-profiles-repo-latest-commit', latestCommit);

  console.log('All files in app storage:', await listAllFiles(true));
};

const downloadAndUnpackRequirementsProfileRepo = async () => {
  const downloadUrl =
    'https://github.com/Citizen-Knowledge-Graph/requirement-profiles/archive/main.zip';
  const targetLocation = FileSystem.documentDirectory + 'main.zip';
  const { uri: actualLocation } = await FileSystem.downloadAsync(
    downloadUrl,
    targetLocation
  );

  let binaryData = await fetchZipAssetFromFileUri(actualLocation);
  let unzippedData = await unzipFromBase64(binaryData);

  console.log('Adding files from repo main.zip:');
  for (const file of unzippedData) {
    if (!file.filename.endsWith('.ttl') || file.filename.includes('/dev/')) {
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

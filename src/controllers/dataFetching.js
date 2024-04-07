import {
  writeFile,
  fetchZipAssetFromModule,
  fetchZipAssetFromFileUri,
  listAllFiles,
  deleteAllFiles,
} from '../utilities/fileManagement';
import { unzipFromBase64 } from '../utilities/zipHandling';
import * as FileSystem from 'expo-file-system';

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

  const downloadUrl =
    'https://github.com/Citizen-Knowledge-Graph/requirement-profiles/archive/main.zip';
  const targetLocation = FileSystem.documentDirectory + 'main.zip';
  const { uri: actualLocation } = await FileSystem.downloadAsync(
    downloadUrl,
    targetLocation
  );

  binaryData = await fetchZipAssetFromFileUri(actualLocation);
  unzippedData = await unzipFromBase64(binaryData);

  console.log('Adding files from repo main.zip:');
  for (const file of unzippedData) {
    if (!file.filename.endsWith('.ttl') || file.filename.includes('/dev/')) {
      continue;
    }
    let filename = file.filename.split('/').slice(1).join('/'); // remove "requirement-profiles-main/" from the beginning
    await writeFile(filename, file.fileContent, true);
  }

  // delete main.zip
  await FileSystem.deleteAsync(actualLocation);

  console.log('All files in app storage:', await listAllFiles(true));
};

export default fetchDataToDevice;

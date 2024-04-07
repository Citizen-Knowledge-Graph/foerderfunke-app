import {
  writeFile,
  fetchZipAssetFromModule,
  fetchZipAssetFromFileUri,
  listAllFiles,
  deleteAllFiles,
} from "../utilities/fileManagement";
import { unzipFromBase64 } from '../utilities/zipHandling';
import * as FileSystem from 'expo-file-system';

const fetchDataToDevice = async () => {
  // 1. Delete all files

  await deleteAllFiles();

  // 2. Unpack local data.zip

  let binaryData = await fetchZipAssetFromModule(
    require('../../assets/data.zip')
  );
  let unzippedData = await unzipFromBase64(binaryData);

  for (const file of unzippedData) {
    console.log('from data.zip:', file.filename);
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

  for (const file of unzippedData) {
    if (!file.filename.endsWith('.ttl') || file.filename.includes('/dev/')) {
      continue;
    }
    let filename = file.filename.split('/').slice(1).join('/'); // remove "requirement-profiles-main/" from the beginning
    console.log('from repo main.zip:', filename);
    await writeFile(filename, file.fileContent, true);
  }

  console.log(await listAllFiles(true));
};

export default fetchDataToDevice;

import { writeFile, fetchZipAssetFromModule, fetchZipAssetFromFileUri } from '../utilities/fileManagement';
import { unzipFromBase64 } from '../utilities/zipHandling';
import * as FileSystem from 'expo-file-system';

const fetchDataToDevice = async () => {
  let binaryData = await fetchZipAssetFromModule(require('../../assets/data.zip'));
  let unzippedData = await unzipFromBase64(binaryData);

  for (const file of unzippedData) {
    console.log('from data.zip:', file.filename);
    await writeFile(file.filename, file.fileContent, true);
  }

  const downloadUrl = 'https://github.com/Citizen-Knowledge-Graph/requirement-profiles/archive/main.zip';
  const targetLocation = FileSystem.documentDirectory + 'main.zip';
  const { uri: actualLocation } = await FileSystem.downloadAsync(downloadUrl, targetLocation);

  binaryData = await fetchZipAssetFromFileUri(actualLocation);
  unzippedData = await unzipFromBase64(binaryData);

  for (const file of unzippedData) {
    console.log('from repo main.zip:', file.filename);
    await writeFile(file.filename, file.fileContent, true);
  }
};

export default fetchDataToDevice;

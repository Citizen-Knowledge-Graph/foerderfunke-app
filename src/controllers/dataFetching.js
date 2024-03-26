import { writeFile, fetchZipAsset } from '../utilities/fileManagement';
import { unzipFromBase64 } from '../utilities/zipHandling';

// Fetch all data and copy it to device
const fetchDataToDevice = async () => {
  // Fetch zipped data and wrangle to binary
  const binaryData = await fetchZipAsset(require('../../assets/data.zip'));

  // Unzip data
  const unzippedData = await unzipFromBase64(binaryData);
  g;

  // Write unzipped data to device
  for (const file of unzippedData) {
    console.log(file.filename);
    await writeFile(file.filename, file.fileContent, true);
  }
};

export default fetchDataToDevice;

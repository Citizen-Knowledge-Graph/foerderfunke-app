import { writeFile, fetchZipAsset } from '../utilities/fileManagement';
import { unzipFromBase64 } from '../utilities/zipHandling';

const fetchDataToDevice = async () => {
  const binaryData = await fetchZipAsset(require('../../assets/data.zip'));
  const unzippedData = await unzipFromBase64(binaryData);
  for (const file of unzippedData) {
    console.log(file.filename);
    await writeFile(file.filename, file.fileContent, true);
  }
};

export default fetchDataToDevice;

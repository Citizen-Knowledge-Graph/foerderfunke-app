import RNFS from 'react-native-fs';
import { readDirectory, ensureDirectoryExists } from './fileManagement';

// Configuration
const DATA_PATH = "/assets/data";

// Fetch individual file and copy it to device
const fetchFileToDevice = async (filename) => {

  // set up file paths
  const sourcePath = RNFS.MainBundlePath + `/assets/data/${filename}`;
  const destinationPath = RNFS.DocumentDirectoryPath + `/${filename}`;

  // fetch data to device
  try {
    const fileExists = await RNFS.exists(destinationPath);
    if (!fileExists) {
      await RNFS.copyFile(sourcePath, destinationPath);
      console.log(`${filename} copied to DocumentDirectoryPath`);
    }
  } catch (error) {
    console.error(`Error copying ${sourcePath}: `, error);
  }
};

// Fetch entire directory to device
const fetchDirectoryToDevice = async (directory) => {

  // set up directory paths
  const bundleDirectoryPath = RNFS.MainBundlePath + `/assets/data/${directory}`
  const deviceDirectoryPath = RNFS.DocumentDirectoryPath + `/${directory}`;
  await ensureDirectoryExists(deviceDirectoryPath);

  // read file names and fetch to device
  const filepaths = await readDirectory(bundleDirectoryPath)
  filepaths.map(filename => fetchFileToDevice(`${directory}/${filename}`))
}

// Fetch all data and copy it to device
const fetchDataToDevice = async () => {

  // Fetch user profile
  await fetchFileToDevice('user-profile.ttl');

  // Fetch queries
  await fetchDirectoryToDevice('queries');
};

export default fetchDataToDevice;

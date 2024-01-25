import { readDirectory, ensureDirectoryExists, copyFileToDevice } from '../utilities/fileManagement';

// Fetch individual file and copy it to device
const fetchFileToDevice = async (relativefilename) => {
  await copyFileToDevice(relativefilename);
};

// Fetch entire directory to device
const fetchDirectoryToDevice = async (directory) => {

  // ensure target directory exists
  await ensureDirectoryExists(directory);

  // read file names from bundle and fetch to device
  const filepaths = await readDirectory(directory, "bundle")

  // copy individual files over
  filepaths.map(filename => fetchFileToDevice(directory + "/" + filename))
}

// Fetch all data and copy it to device
const fetchDataToDevice = async () => {

  // Fetch user profile
  await fetchFileToDevice('user-profile.ttl');

  // Fetch query registry
  await fetchFileToDevice('query-registry.json');

  // Fetch queries
  await fetchDirectoryToDevice('queries');
};

export default fetchDataToDevice;

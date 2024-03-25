import {
  copyFileToDevice,
  copyDirectoryToDevice,
} from '../utilities/fileManagement';

// Fetch individual file and copy it to device
const fetchFileToDevice = async relativefilename => {
  await copyFileToDevice(relativefilename);
};

// Fetch entire directory to device
const fetchDirectoryToDevice = async directory => {
  await copyDirectoryToDevice(directory);
};

// Fetch all data and copy it to device
const fetchDataToDevice = async () => {
  // Fetch user profile
  await fetchFileToDevice('user-profile.ttl');
  await fetchFileToDevice('user-profile-hydration.txt');

  // Fetch query registry
  await fetchFileToDevice('query-registry.json');

  // Fetch entity registry
  await fetchFileToDevice('entity-registry.json');

  // Fetch guide registry
  await fetchFileToDevice('guides-registry.json');

  // Fetch queries
  await fetchDirectoryToDevice('queries');

  // Fetch guides
  await fetchDirectoryToDevice('guides');

  // Fetch entity validation
  await fetchDirectoryToDevice('entity-validation');
};

export default fetchDataToDevice;

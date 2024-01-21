import RNFS from 'react-native-fs';

const BUNDLE_DATA_PATH = "/assets/data/"

const setAbsolutePath = (relativeFilePath, filesystem) => {
  switch (filesystem) {
    case "device":
      return RNFS.DocumentDirectoryPath + `/${relativeFilePath}`;
    case "bundle":
      return RNFS.MainBundlePath + BUNDLE_DATA_PATH + `${relativeFilePath}`;
    default:
      throw new Error('No valid filesystem provided');
  }
}

// Function to read file in - possible for both device and bundle. we set default to device
export const readFile = async (relativeFilePath, filesystem = "device") => {
  const absoluteFilePath = setAbsolutePath(relativeFilePath, filesystem)

  try {
    // Check if file exists
    const fileExists = await RNFS.exists(absoluteFilePath);
    if (!fileExists) {
      console.log(`File does not exist: ${relativeFilePath}`);
      return null;
    }

    // Read the file
    const fileContents = await RNFS.readFile(absoluteFilePath, 'utf8');
    return fileContents;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
};

/**
 * Asynchronously reads a file from the specified relative path and options.
 *
 * @param {string} relativeFilepath - The relative path of the file to be read.
 * @param {string} filesystem - The filesystem to be used. Can be 'device' or 'bundle'.
 * @returns {Promise<string>} A promise that resolves with the contents of the file.
 */
export const readDirectory = async (relativeDirectoryPath, filesystem = "device") => {
  const absoluteFilePath = setAbsolutePath(relativeDirectoryPath, filesystem)
  try {
    files = await RNFS.readDir(absoluteFilePath, 'utf8');
    return files.map(file => file.name);
  } catch (error) {
    console.error('Error reading directory ', error);
  }
};

// copy data from bundle to device
export const copyFileToDevice = async (relativeFileName) => {

  // configure file paths
  const bundleFilePath = setAbsolutePath(relativeFileName, "bundle")
  const deviceFilePath = setAbsolutePath(relativeFileName, "device")

  try {
    const fileExists = await RNFS.exists(deviceFilePath);
    if (!fileExists) {
      await RNFS.copyFile(bundleFilePath, deviceFilePath);
      console.log(`${relativeFileName} copied to DocumentDirectoryPath`);
    } else {
      console.log(`${relativeFileName} already exists on device`);
    }
  } catch (error) {
    console.error(`Error copying ${bundleFilePath}: `, error);
  }
}

// check if directory exists or else create it
export const ensureDirectoryExists = async (relativeDirectoryPath) => {
  const absoluteDirectoryPath = setAbsolutePath(relativeDirectoryPath, "device")

  const directoryExists = await RNFS.exists(absoluteDirectoryPath);
  if (!directoryExists) {
    try {
      await RNFS.mkdir(absoluteDirectoryPath);
      console.log(`Directory created at: ${relativeDirectoryPath}`);
    } catch (error) {
      console.error(`Error creating directory: ${error.message}`);
      // Handle any errors, such as permissions issues
    }
  }
};
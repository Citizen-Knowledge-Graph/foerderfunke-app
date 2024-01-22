import RNFS from 'react-native-fs';

const BUNDLE_DATA_PATH = "/assets/data/"

/**
 * Constructs the absolute file path based on the provided filesystem.
 *
 * This function takes a relative file path and a filesystem type ('device' or 'bundle') and constructs the absolute path based on the filesystem.
 *
 * @param {string} relativeFilePath - The relative path of the file.
 * @param {string} filesystem - The type of filesystem ('device' or 'bundle').
 * @returns {string} The absolute file path.
 * @throws {Error} If an invalid filesystem is provided.
 */
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

/**
 * Asynchronously reads a file's contents from the specified filesystem.
 *
 * This function takes a relative file path and an optional filesystem type, 
 * reads the file from the specified path, and returns its contents as a string.
 *
 * @param {string} relativeFilePath - The relative path of the file to be read.
 * @param {string} [filesystem='device'] - The filesystem type ('device' by default).
 * @returns {Promise<string|null>} A promise that resolves to the file's contents, or null if the file does not exist or an error occurs.
 */
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
 * Asynchronously reads a JSON file and parses it to a JavaScript object.
 *
 * This function reads a file from the specified relative file path and filesystem, 
 * and then tries to parse it as JSON. It returns the parsed JavaScript object or 
 * null if an error occurs during reading or parsing.
 *
 * @param {string} relativeFilePath - The relative path of the JSON file to be read.
 * @param {string} [filesystem="device"] - The filesystem type ('device' by default). Specifies where to read the file from.
 * @returns {Promise<Object|null>} A promise that resolves to the parsed JSON object, or null if an error occurs.
 */
export const readJson = async (relativeFilePath, filesystem = "device") => {
  const stringObject = await readFile(relativeFilePath, filesystem);

  try {
    return JSON.parse(stringObject);
  } catch (error) {
    console.error("Error parsing file to Json", error);
    return null;
  }
}

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

/**
 * Asynchronously copies a file from the bundle to the device directory.
 *
 * This function checks if the specified file exists in the device directory, 
 * and if not, copies it from the bundle directory to the device directory.
 *
 * @param {string} relativeFileName - The relative name of the file to be copied.
 * @returns {Promise<void>} A promise that resolves when the file has been copied or if it already exists.
 */
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

/**
 * Asynchronously ensures that a directory exists in the device directory.
 *
 * This function checks if the specified directory exists in the device directory, and if not, creates it.
 *
 * @param {string} relativeDirectoryPath - The relative path of the directory to check or create.
 * @returns {Promise<void>} A promise that resolves when the directory has been checked or created.
 */
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
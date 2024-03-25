import * as FileSystem from 'expo-file-system';

const BUNDLE_DATA_PATH = '/assets/data/';

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
    case 'device':
      return FileSystem.documentDirectory + `/${relativeFilePath}`;
    case 'bundle':
      return (
        FileSystem.bundleDirectory + BUNDLE_DATA_PATH + `${relativeFilePath}`
      );
    default:
      throw new Error('No valid filesystem provided');
  }
};

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
export const readFile = async (relativeFilePath, filesystem = 'device') => {
  const absoluteFilePath = setAbsolutePath(relativeFilePath, 'bundle');

  try {
    const fileExists = await FileSystem.getInfoAsync(absoluteFilePath);
    if (!fileExists.exists) {
      console.log(`File does not exist: ${relativeFilePath}`);
      return null;
    }
    return await FileSystem.readAsStringAsync(absoluteFilePath);
  } catch (error) {
    console.error(`Error reading file: ${relativeFilePath}`, error);
    return null;
  }
};

/**
 * Asynchronously writes contents to a file on the specified filesystem.
 *
 * This function takes a relative file path, content to write, and an optional filesystem type,
 * writes the content to the file at the specified path, and returns a promise that resolves when the operation is complete.
 *
 * @param {string} relativeFilePath - The relative path of the file to be written.
 * @param {string} content - The content to be written to the file.
 * @param {string} [filesystem='device'] - The filesystem type ('device' by default).
 * @returns {Promise<boolean>} A promise that resolves to true if the file is written successfully, or rejects if an error occurs.
 */
export const writeFile = async (
  relativeFilePath,
  content,
  filesystem = 'device',
) => {
  const absoluteFilePath = setAbsolutePath(relativeFilePath, filesystem);

  try {
    await FileSystem.writeAsStringAsync(absoluteFilePath, content);
    console.log(`File written successfully: ${relativeFilePath}`);
    return true;
  } catch (error) {
    console.error(`Error writing file: ${relativeFilePath}`, error);
    throw error;
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
export const readJson = async (relativeFilePath, filesystem = 'device') => {
  const stringObject = await readFile(relativeFilePath, filesystem);

  try {
    return JSON.parse(stringObject);
  } catch (error) {
    console.error('Error parsing file to Json', error);
    return null;
  }
};

/**
 * Asynchronously ensures that a directory exists in the device directory.
 *
 * This function checks if the specified directory exists in the device directory, and if not, creates it.
 *
 * @param {string} relativeDirectoryPath - The relative path of the directory to check or create.
 * @returns {Promise<void>} A promise that resolves when the directory has been checked or created.
 */
export const ensureDirectoryExists = async relativeDirectoryPath => {
  const absoluteDirectoryPath = setAbsolutePath(
    relativeDirectoryPath,
    'device',
  );

  const directoryExists = await FileSystem.getInfoAsync(absoluteDirectoryPath);
  if (!directoryExists.exists) {
    try {
      await FileSystem.makeDirectoryAsync(absoluteDirectoryPath);
      console.log(`Directory created at: ${relativeDirectoryPath}`);
    } catch (error) {
      console.error(`Error creating directory: ${error.message}`);
    }
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
export const copyFileToDevice = async relativeFileName => {
  // configure file paths
  const bundleFilePath = setAbsolutePath(relativeFileName, 'bundle');
  const deviceFilePath = setAbsolutePath(relativeFileName, 'device');

  try {
    const fileExists = await FileSystem.getInfoAsync(deviceFilePath);
    if (!fileExists.exists) {
      await FileSystem.copyAsync({from: bundleFilePath, to: deviceFilePath});
      console.log(`${relativeFileName} copied to DocumentDirectoryPath`);
    } else {
      console.log(`${relativeFileName} already exists on device`);
    }
  } catch (error) {
    console.error(`Error copying ${bundleFilePath}: `, error);
  }
};

/**
 * Recursively copies a directory from the bundle to the device directory.
 *
 * This function checks if the specified directory and its subdirectories exist on the device,
 * and if not, creates them. It then copies all files from the bundle to the device directory,
 * applying the process recursively to subdirectories.
 *
 * @param {string} relativeDirectoryPath - The relative path of the directory to be copied.
 * @returns {Promise<void>} A promise that resolves when the entire directory has been copied.
 */
export const copyDirectoryToDevice = async relativeDirectoryPath => {
  const bundleDirPath = setAbsolutePath(relativeDirectoryPath, 'bundle');

  try {
    await ensureDirectoryExists(relativeDirectoryPath);
    const items = await FileSystem.readDirectoryAsync(bundleDirPath);
    for (let item of items) {
      const relativeItemPath = `${relativeDirectoryPath}/${item}`;
      const itemType = await FileSystem.getInfoAsync(relativeItemPath);

      if (itemType.isDirectory) {
        await copyDirectoryToDevice(relativeItemPath);
      } else {
        await copyFileToDevice(relativeItemPath);
      }
    }
  } catch (error) {
    console.error(
      `Error copying directory ${bundleDirPath} to device: `,
      error,
    );
  }
};

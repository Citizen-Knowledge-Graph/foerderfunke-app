import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import base64 from 'react-native-base64';

/**
 * Asynchronously reads a file's contents from the specified filesystem.
 *
 * This function takes a relative file path and an optional filesystem type,
 * reads the file from the specified path, and returns its contents as a string.
 *
 * @param {string} relativeFilePath - The relative path of the file to be read.
 * @returns {Promise<string|null>} A promise that resolves to the file's contents, or null if the file does not exist or an error occurs.
 */
export const readFile = async (relativeFilePath) => {
  const absoluteFilePath = FileSystem.documentDirectory + relativeFilePath;

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
 * @param {boolean} create_directory - Whether to create the directory if it does not exist.
 * @returns {Promise<boolean>} A promise that resolves to true if the file is written successfully, or rejects if an error occurs.
 */
export const writeFile = async (
  relativeFilePath,
  content,
  create_directory = false
) => {
  const absoluteFilePath = FileSystem.documentDirectory + relativeFilePath;

  if (create_directory) {
    const directory = relativeFilePath.substring(
      0,
      relativeFilePath.lastIndexOf('/')
    );
    await ensureDirectoryExists(directory);
  }

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
 * @returns {Promise<Object|null>} A promise that resolves to the parsed JSON object, or null if an error occurs.
 */
export const readJson = async (relativeFilePath) => {
  const stringObject = await readFile(relativeFilePath);

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
export const ensureDirectoryExists = async (relativeDirectoryPath) => {
  const absoluteDirectoryPath =
    FileSystem.documentDirectory + relativeDirectoryPath;

  const directoryExists = await FileSystem.getInfoAsync(absoluteDirectoryPath);
  if (!directoryExists.exists) {
    try {
      await FileSystem.makeDirectoryAsync(absoluteDirectoryPath, {
        intermediates: true,
      });
      console.log(`Directory created at: ${relativeDirectoryPath}`);
    } catch (error) {
      console.error(`Error creating directory: ${error.message}`);
    }
  }
};

export const fetchZipAssetFromModule = async (zip_module) => {
  const asset = await Asset.loadAsync(zip_module);
  return fetchZipAssetFromFileUri(asset[0].localUri);
};

export const fetchZipAssetFromFileUri = async (fileUri) => {
  const fileContent = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return base64.decode(fileContent);
};

const collectFilesRecursively = async (path, list, shortenToRelativePath) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(path);
    if (fileInfo.isDirectory) {
      const filesInDir = await FileSystem.readDirectoryAsync(path);
      for (const file of filesInDir) {
        await collectFilesRecursively(`${path}/${file}`, list, shortenToRelativePath);
      }
    } else {
      list.push(shortenToRelativePath ? path.replace(FileSystem.documentDirectory, '') : path);
    }
  } catch (err) {
    console.error(`Error accessing path: ${path}`, err);
  }
};

export const listAllFiles = async (shortenToRelativePath = false) => {
  const rootDirectory = FileSystem.documentDirectory.slice(0, -1); // remove trailing slash
  if (!rootDirectory) {
    console.error('Unable to access document directory.');
    return [];
  }
  let list = [];
  await collectFilesRecursively(rootDirectory, list, shortenToRelativePath);
  return list;
};

export const deleteAllFiles = async () => {
  let paths = await listAllFiles();
  for (const path of paths) {
    await FileSystem.deleteAsync(path);
  }
};

export const fileExists = async (relativeFilePath) => {
  const absoluteFilePath = FileSystem.documentDirectory + relativeFilePath;
  const fileInfo = await FileSystem.getInfoAsync(absoluteFilePath);
  return fileInfo.exists;
};

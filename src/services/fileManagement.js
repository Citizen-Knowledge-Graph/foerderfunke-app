import RNFS from 'react-native-fs';

export const readFileFromFS = async (filename) => {
  const filePath = RNFS.DocumentDirectoryPath + `/${filename}`;
  try {
    // Check if file exists
    const fileExists = await RNFS.exists(filePath);
    if (!fileExists) {
      console.log(`File does not exist: ${filename}`);
      return null;
    }

    // Read the file
    const fileContents = await RNFS.readFile(filePath, 'utf8');
    return fileContents;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
};


export const readDirectory = async (directoryPath) => {
  try {
    files = await RNFS.readDir(directoryPath, 'utf8');
    const fileNames = files.map(file => file.name);
    return fileNames;
  } catch (error) {
    console.error('Error reading files: ', error);
  }
};

export const ensureDirectoryExists = async (directoryPath) => {
  const directoryExists = await RNFS.exists(directoryPath);
  if (!directoryExists) {
    try {
      await RNFS.mkdir(directoryPath);
      console.log(`Directory created at: ${directoryPath}`);
    } catch (error) {
      console.error(`Error creating directory: ${error.message}`);
      // Handle any errors, such as permissions issues
    }
  }
};

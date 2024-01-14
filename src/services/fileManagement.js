import RNFS from 'react-native-fs';

const copyFileIfNeeded = async (filename) => {
  const sourcePath = RNFS.MainBundlePath + `/assets/data/${filename}`;
  const destinationPath = RNFS.DocumentDirectoryPath + `/${filename}`;

  console.log(sourcePath)
  try {
    // Check if file already exists in the destination
    const fileExists = await RNFS.exists(destinationPath);
    if (!fileExists) {
      // Copy file from bundle to document directory
      await RNFS.copyFile(sourcePath, destinationPath);
      console.log(`${filename} copied to DocumentDirectoryPath`);
    }
  } catch (error) {
    console.error(`Error copying ${filename}: `, error);
  }
};

export const readFileFromFS = async (filename) => {
  const filePath = RNFS.DocumentDirectoryPath + `/${filename}`;

  try {
    // Check if file exists
    const fileExists = await RNFS.exists(filePath);
    if (!fileExists) {
      console.log('File does not exist');
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

export const loadInitialData = async () => {
  await copyFileIfNeeded('citizen-a.ttl');
};

export const readProjectDir = async () => {
  const sourcePath = RNFS.MainBundlePath + `/assets`;
  dirContents = await RNFS.readDir(sourcePath, 'utf8');
  console.log('Directory contents:', dirContents);
};

export const readTestFile = async () => {
  await readFileFromFS("citizen-a.ttl");
};

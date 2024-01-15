import RNFS from 'react-native-fs';

const copyFileIfNeeded = async (filename) => {
  const sourcePath = RNFS.MainBundlePath + `/assets/data/${filename}`;
  const destinationPath = RNFS.DocumentDirectoryPath + `/${filename}`;

  try {
    const fileExists = await RNFS.exists(destinationPath);
    if (!fileExists) {
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

export const loadInitialData = async () => {
  await copyFileIfNeeded('citizen-b.ttl');
  await copyFileIfNeeded('citizen-solar-funding.ttl');
};

export const readProjectDir = async () => {
  const sourcePath = RNFS.MainBundlePath + `/assets`;
  dirContents = await RNFS.readDir(sourcePath, 'utf8');
  console.log('Directory contents:', dirContents);
};

export const readTestFile = async () => {
  await readFileFromFS("citizen-a.ttl");
};

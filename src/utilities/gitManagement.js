import * as FileSystem from 'expo-file-system';

export const fetchLatestCommitHash = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to fetch latest commit');
      return null;
    }
    const commits = await response.json();
    if (commits.length > 0) {
      console.log(`Latest Commit Hash: ${commits[0].sha}`);
      return commits[0].sha;
    } else {
      console.error('No commits found');
      return null;
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const downloadRepoZip = async (
  downloadUrl,
  targetLocation = 'main.zip'
) => {
  const absoluteTargetLocation = `${FileSystem.documentDirectory}${targetLocation}`;
  try {
    const { uri: actualLocation } = await FileSystem.downloadAsync(
      downloadUrl,
      absoluteTargetLocation
    );
    console.log('Downloaded zip to:', actualLocation);
    return actualLocation;
  } catch (error) {
    console.error('Failed to download zip:', error);
    return null;
  }
};

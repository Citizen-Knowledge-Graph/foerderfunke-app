import * as FileSystem from 'expo-file-system';
import { fetchZipAssetFromFileUri } from './fileManagement';

export const fetchLatestCommitHash = async (repo) => {
  const url =
    'https://api.github.com/repos/' + repo + '/' + 'commits?per_page=1';
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

export const fetchZipAssetFromRepository = async (repository, zipPath) => {
  const baseURL = 'https://github.com';
  const absoluteArchivePath = `${baseURL}/${repository}/raw/${zipPath}`;
  const temporaryTargetLocation = `${FileSystem.documentDirectory}main.zip`;
  console.log('Downloading zip from:', absoluteArchivePath);
  try {
    const downloadResult = await FileSystem.downloadAsync(
      absoluteArchivePath,
      temporaryTargetLocation
    );
    console.log('Downloaded zip to:', downloadResult.uri);

    return await fetchZipAssetFromFileUri(downloadResult.uri);
  } catch (error) {
    console.error('Failed to download zip:', error);
    throw error;
  }
};

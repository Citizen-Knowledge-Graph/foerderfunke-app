import * as FileSystem from 'expo-file-system';

export const fetchLatestCommitHash = async (
  repo_url,
  commit_suffix = 'commits?per_page=1'
) => {
  const url = repo_url + '/' + commit_suffix;
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

export const downloadRepoArchive = async (repoUrl, branch = 'main') => {
  const archiveUrl = `${repoUrl}/archive/${branch}.zip`;
  const absoluteTargetLocation = `${FileSystem.documentDirectory}${branch}.zip`;
  try {
    const { uri: actualLocation } = await FileSystem.downloadAsync(
      archiveUrl,
      absoluteTargetLocation
    );
    console.log('Downloaded zip to:', actualLocation);
    return actualLocation;
  } catch (error) {
    console.error('Failed to download zip:', error);
    return null;
  }
};

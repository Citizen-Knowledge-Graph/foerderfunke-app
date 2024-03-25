const {getDefaultConfig} = require('expo/metro-config');
const {mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import("metro-config").MetroConfig}
 */
const config = {
  // Extend the existing resolver configuration
  resolver: {
    // Extend the array of file extensions that Metro will handle
    sourceExts: [
      // Include default file extensions
      ...getDefaultConfig(__dirname).resolver.sourceExts,
      // Add your custom file extensions here
      'ttl', // Example: Adding .svg files
      'json', // Example: Adding .svg files
      'txt',
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

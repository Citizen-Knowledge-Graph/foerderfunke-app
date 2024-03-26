const { getDefaultConfig } = require("expo/metro-config");
const { mergeConfig } = require("@react-native/metro-config");

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import("metro-config").MetroConfig}
 */
const config = {
  resolver: {
    sourceExts: [...getDefaultConfig(__dirname).resolver.sourceExts, "zip"],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// This replaces `const { getDefaultConfig } = require('expo/metro-config');`
const { getSentryExpoConfig } = require('@sentry/react-native/metro');

// This replaces `const config = getDefaultConfig(__dirname);`
const defaultConfig = getSentryExpoConfig(__dirname);

defaultConfig.resolver.assetExts.push("ttf", "mp4")
defaultConfig.resolver.extraNodeModules = {
  ...require('node-libs-react-native'),
  dns: require.resolve('node-libs-react-native/mock/dns'),
  fs: require.resolve('node-libs-react-native/mock/dns'),
  net: require.resolve('node-libs-react-native/mock/net'),
};

module.exports = defaultConfig;

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const { assetExts, sourceExts } = getDefaultConfig(__dirname).resolver;

const config = {
  server: {
    port: 8082,
  },
  resolver: {
    sourceExts: [...sourceExts, 'svg', 'json'],
    assetExts: assetExts.filter(ext => ext !== 'svg'),
  },
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer/react-native',
    ),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

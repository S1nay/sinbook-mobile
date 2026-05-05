module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@core': './src/core',
          '@data': './src/data',
          '@domain': './src/domain',
          '@presentation': './src/presentation',
          '@infrastructure': './src/infrastructure',
          '@navigation': './src/navigation',
          '@shared': './src/presentation/shared',
          '@ui': './src/presentation/ui',
          '@components': './src/presentation/components',
          '@screens': './src/presentation/screens',
          '@layouts': './src/presentation/_layouts',
        },
      },
    ],
    'react-native-worklets/plugin',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'babel-plugin-transform-typescript-metadata',
    ['react-native-unistyles/plugin', { root: 'src' }],
],
};

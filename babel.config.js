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
        },
      },
    ],
  ],
};

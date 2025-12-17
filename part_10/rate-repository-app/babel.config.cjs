// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Add any plugins you use; common ones below:
      // 'module-resolver',
      // 'react-native-paper/babel',
      // Reanimated (if you use it) MUST be last:
      //'react-native-reanimated/plugin',
    ],
  };
};

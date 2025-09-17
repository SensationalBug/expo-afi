// expo-plugins/android-min-sdk.js
const { withGradleProperties } = require('@expo/config-plugins');

function withAndroidMinSdk(config, minSdkVersion = 26) {
  return withGradleProperties(config, config => {
    config.modResults = [
      ...config.modResults.filter(item => item.key !== 'android.minSdkVersion'),
      {
        type: 'property',
        key: 'android.minSdkVersion',
        value: minSdkVersion.toString()
      }
    ];
    return config;
  });
}

module.exports = withAndroidMinSdk;

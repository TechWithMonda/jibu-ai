const { generateAssets } = require('@capacitor/assets');
generateAssets({
  iconPath: 'logo_resized.png',
  splashPath: 'logo_resized.png',
  platforms: ['android', 'ios'],
}).then(() => console.log('Assets generated ✅'))
  .catch(console.error);

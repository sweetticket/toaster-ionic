Push.Configure({
  // gcm: {
  //   apiKey: 'xxxxxxxxxxxxx'
  // },
  apn: {
    // pem files are placed in the app private folder
    certData: Assets.getText('dev_cert.pem'),
    keyData: Assets.getText('dev_key.pem'),
  },
  apn_dev: {
    // pem files are placed in the app private folder
    certData: Assets.getText('dev_cert.pem'),
    keyData: Assets.getText('dev_key.pem'),
  },
  production: false, // use production server or sandbox
});

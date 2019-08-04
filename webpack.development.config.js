const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let webpackConfig = require('./webpack.config.js');

webpackConfig = {
  ...webpackConfig,
  mode: 'development',
  devtool: 'source-map',
  watch: true,
};
webpackConfig.plugins.push(new BrowserSyncPlugin({
  host: process.env.IP || 'localhost',
  port: process.env.PORT || 3000,
  server: {
    baseDir: ['./dist'],
  },
}));

module.exports = webpackConfig;

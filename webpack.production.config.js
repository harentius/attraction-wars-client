const TerserPlugin = require('terser-webpack-plugin');
let webpackConfig = require('./webpack.config.js');

webpackConfig = {
  ...webpackConfig,
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};

module.exports = webpackConfig;

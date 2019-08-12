const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const TerserPlugin = require('terser-webpack-plugin');
let webpackConfig = require('./webpack.config.js');

webpackConfig.plugins.push(
  new HtmlWebpackPartialsPlugin({
    path: './src/templates/partials/analytics.html',
    location: 'head',
    priority: 'high',
  }),
);

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

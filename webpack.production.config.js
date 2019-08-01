const path = require('path');
const webpack = require('webpack');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
});

module.exports = {
  entry: {
    app: [path.resolve(__dirname, 'src/app.js')],
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: './public/dist/',
    filename: '[name].js',
  },
  plugins: [
    definePlugin,
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
      SERVER_URL: JSON.stringify(process.env.SERVER_URL),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};

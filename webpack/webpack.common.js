const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: path.join(path.resolve(__dirname, '../src'), 'app.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/bundle.js',
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/views/layouts/main.hbs',
      minify: {
        html5: true,
        collapseWhitespace: true,
        caseSensitive: true,
        removeComments: true,
        removeEmptyElements: true
      }
    }),
    new NodePolyfillPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name]-styles.css",
      chunkFilename: "[id].css"
    }),
  ],
  resolve: {
    extensions: ['.js'],
    fallback: {
      "async_hooks": false,
      "fs": false,
      "tls": false,
      "net": false,
      "path": require.resolve('path-browserify'),
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "util": false,
      "crypto": require.resolve('crypto-browserify'),
    },
  },
  externals: {
    express: 'express',
    handlebars: 'handlebars',
  },
}
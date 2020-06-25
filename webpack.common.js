const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const path = require(`path`);

module.exports = {
  entry: {
    main: ['./src/index.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      'st': path.join(__dirname, 'src/static')
    }
  },
  output: {
    filename: `index.js`,
    path: path.join(__dirname, `docs`),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    })
  ]
};

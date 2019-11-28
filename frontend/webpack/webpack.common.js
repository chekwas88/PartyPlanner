const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const { appDirectory, buildDirectory } = require('./filePaths');

const miniCssPlugin = new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css',
  });

module.exports = {
  entry: {
    bundle: `${appDirectory}/index.js`,
  },
  output: {
    path: buildDirectory,
    filename: 'build.bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-runtime',
                '@babel/plugin-transform-arrow-functions',
              ],
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@landing': path.resolve(__dirname, '../src/components/views/Landing'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@views': path.resolve(__dirname, '../src/views'),
      '@image': path.resolve(__dirname, '../public/img'),
      '@containers': path.resolve(__dirname, '../src/containers'),
      '@styles': path.resolve(__dirname, '../src/styles'),
    },
    extensions: [' ', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    miniCssPlugin,
    new HtmlWebpackPlugin({
      template: `${appDirectory}/index.html`,
      filename: `${buildDirectory}/index.html`,
    }),
  ],
};
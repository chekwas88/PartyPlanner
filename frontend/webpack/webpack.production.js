const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const uglifyJS = new UglifyJsPlugin({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  cache: true,
  parallel: true,
});

module.exports = {
  devtool: 'source-map',
  performance: {
    hints: false,
  },
  optimization: {
    minimizer: [uglifyJS],
  },
  plugins: [
    uglifyJS,
  ],
};
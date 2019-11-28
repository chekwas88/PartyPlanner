const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    port: 6060,
    publicPath: '/',
    proxy: {

      '/api/**': {
        target: 'http://127.0.0.1:5000',
        secure: false,
        changeOrigin: true,
      }
    }
  },
  plugins: [new ErrorOverlayPlugin()],
};
const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        resolve: {
          ...webpackConfig.resolve,
          fallback: {
            ...webpackConfig.resolve.fallback,
            "crypto": require.resolve('crypto-browserify'),
            "http": require.resolve('stream-http'),
            "https": require.resolve('https-browserify'),
            "util": require.resolve('util'),
            "buffer": require.resolve('buffer/'),
            "stream": require.resolve('stream-browserify'),
            "url": require.resolve('url/'),
            "process": require.resolve('process/browser'),
          }
        },
        plugins: [
          ...webpackConfig.plugins,
          new webpack.ProvidePlugin({
            process: 'process/browser',  // Provide a shim for the global `process` variable
          }),
        ],
      };
    }
  }
};

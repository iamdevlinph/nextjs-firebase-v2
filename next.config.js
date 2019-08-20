const withCSS = require('@zeit/next-css');
const withProgressBar = require('next-progressbar');

// https://github.com/zeit/next-plugins/issues/267#issuecomment-436454048
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = file => {};
}

const environment =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

// module.exports = {
//   target: 'serverless',
//   env: {
//     environment,
//   },
// };

// module.exports = withCSS({
//   target: 'serverless',
//   env: {
//     environment,
//   },
// });

// https://github.com/zeit/next.js/issues/6073#issuecomment-485926479
const withAssetRelocator = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options;

      if (isServer) {
        /* eslint-disable-next-line no-param-reassign */
        config.node = Object.assign({}, config.node, {
          __dirname: false,
          __filename: false,
        });

        config.module.rules.unshift({
          test: /\.(m?js|node)$/,
          parser: { amd: false },
          use: {
            loader: '@zeit/webpack-asset-relocator-loader',
            options: {
              outputAssetBase: 'assets',
              existingAssetNames: [],
              wrapperCompatibility: true,
              escapeNonAnalyzableRequires: true,
            },
          },
        });
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  });
};

module.exports = withProgressBar(
  withAssetRelocator(
    withCSS({
      // progressBar: {
      // profile: true,
      // },
      target: 'serverless',
      env: {
        environment,
      },
    })
  )
);

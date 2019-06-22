const withCss = require('@zeit/next-css');
const webpack = require('webpack');
const withTypescript = require('@zeit/next-typescript');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const { GITHUB_OAUTH_URL, OAUTH_URL } = require('./config');

if (typeof require !== 'undefined') {
  require.extensions['.css'] = () => {};
}

module.exports = withBundleAnalyzer(
  withTypescript(
    withCss({
      webpack(config) {
        config.plugins.push(
          new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        );
        return config;
      },
      publicRuntimeConfig: {
        GITHUB_OAUTH_URL,
        OAUTH_URL,
        GITHUB_API_URL: 'https://api.github.com',
      },
      analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: 'static',
          reportFilename: '../bundles/server.html',
        },
        browser: {
          analyzerMode: 'static',
          reportFilename: '../bundles/client.html',
        },
      },
    }),
  ),
);

const withCss = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');
const { GITHUB_OAUTH_URL, OAUTH_URL } = require('./config');

if (typeof require !== 'undefined') {
  require.extensions['.css'] = () => {};
}

module.exports = withTypescript(
  withCss({
    publicRuntimeConfig: {
      GITHUB_OAUTH_URL,
      OAUTH_URL,
      GITHUB_API_URL: 'https://api.github.com',
    },
  }),
);

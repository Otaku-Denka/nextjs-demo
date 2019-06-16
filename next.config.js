import withCss from '@zeit/next-css';
import withTypescript from '@zeit/next-typescript';
import config from './config';

if (typeof require !== 'undefined') {
  require.extensions['.css'] = () => {};
}

module.exports = withTypescript(
  withCss({
    publicRuntimeConfig: {
      GITHUB_OAUTH_URL: config.GITHUB_OAUTH_URL,
      OAUTH_URL: config.OAUTH_URL,
    },
  }),
);

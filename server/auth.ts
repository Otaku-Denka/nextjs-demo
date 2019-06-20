import axios from 'axios';
import config from '../config';
import Koa from 'koa';
import Url from 'url-parse';

const { client_secret, client_id, request_token_url } = config.github;

interface ContextWithSession extends Koa.Context {
  session: any;
}

export default (server: Koa) => {
  server.use(async (ctx: ContextWithSession, next: any) => {
    if (ctx.path === '/auth') {
      const code = ctx.query.code;

      if (!code) {
        ctx.body = 'code not exist';
        return;
      }
      const result = await axios({
        data: {
          client_secret,
          code,
          client_id,
        },
        headers: {
          Accept: 'application/json',
        },
        method: 'POST',
        url: request_token_url,
      });

      if (result.status === 200 && (result.data && !result.data.error)) {
        ctx.session.githubAuth = result.data;

        const { access_token, token_type } = result.data;

        const userInfoResp = await axios({
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
          method: 'GET',
          url: 'https://api.github.com/user',
        });

        ctx.session.userInfo = userInfoResp.data;

        ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/');
        ctx.session.urlBeforeOAuth = '';
      } else {
        const errorMsg = result.data && result.data.error;
        ctx.body = `request token failed ${errorMsg}`;
      }
    } else {
      await next();
    }
  });

  server.use(async (ctx: ContextWithSession, next: any) => {
    const path = ctx.path;
    const method = ctx.method;
    if (path === '/logout' && method === 'POST') {
      ctx.session = null;
      ctx.body = 'logout success';
    } else {
      await next();
    }
  });

  server.use(async (ctx: ContextWithSession, next: any) => {
    const path = ctx.path;
    const method = ctx.method;
    if (path === '/prepare-auth' && method === 'GET') {
      let url: any = Url(ctx.url).query;
      if (url) {
        url = url.replace('?url=', '');
      }
      ctx.session.urlBeforeOAuth = url;
      ctx.redirect(config.OAUTH_URL);
    } else {
      await next();
    }
  });
};

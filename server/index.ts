import Koa from 'koa';
import Router from 'koa-router';
import Next from 'next';
import session from 'koa-session';
import koaBody from 'koa-body';
import auth from './auth';
import IORedis from 'ioredis';
import RedisSessionStore from './session-store';
import atob from 'atob';

declare global {
  namespace NodeJS {
    interface Global {
      atob: any;
    }
  }
}

const dev = process.env.NODE_ENV !== 'production';
const app = Next({ dev });
const handle = app.getRequestHandler();
const redis = new IORedis();
global.atob = atob;

app.prepare().then(
  (): void => {
    const server = new Koa();
    const router = new Router();
    server.keys = ['Jay demo next app'];

    server.use(koaBody());

    const SESSION_CONFIG = {
      key: 'jid',
      store: new RedisSessionStore(redis),
    };

    server.use(session(SESSION_CONFIG, server));
    server.use(router.routes());
    auth(server);
    router.get('/api/user/info', async (ctx: any) => {
      const user = ctx.session.userInfo;
      if (!user) {
        ctx.status = 401;
        ctx.body = 'Need Login';
      } else {
        ctx.body = user;
        ctx.set('Content-Type', 'application/json');
      }
    });

    server.use(async (ctx: any) => {
      ctx.req.session = ctx.session;
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.listen(
      3000,
      (): void => {
        console.log('koa server listening on 3000');
      },
    );
  },
);

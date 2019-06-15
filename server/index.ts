import Koa from 'koa';
import Router from 'koa-router';
import Next from 'next';
import session from 'koa-session';
import koaBody from 'koa-body';
import auth from './auth';
import IORedis from 'ioredis';
import RedisSessionStore from './session-store';

const dev = process.env.NODE_ENV !== 'production';
const app = Next({ dev });
const handle = app.getRequestHandler();
const redis = new IORedis();

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

    server.use(async (ctx: Koa.BaseContext) => {
      ctx.req.session = ctx.session;
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.use(async (ctx: Koa.BaseContext, next: any) => {
      ctx.res.statusCode = 200;
      await next();
    });

    server.listen(
      3000,
      (): void => {
        console.log('koa server listening on 3000');
      },
    );
  },
);

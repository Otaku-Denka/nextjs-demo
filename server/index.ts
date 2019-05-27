import Koa from 'koa';
import Router from 'koa-router';
import Next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = Next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(
  (): void => {
    const server = new Koa();
    const router = new Router();

    server.use(router.routes());

    server.use(
      async (ctx: Koa.BaseContext): void => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
      },
    );

    server.use(async (ctx: Koa.BaseContext, next: void) => {
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

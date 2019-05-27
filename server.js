const koa = require('koa');
const server = new koa();

server.use(async (ctx, next) => {
  console.log(ctx);
});

server.listen(3000, () => {
  console.log('server is on port 3000');
});

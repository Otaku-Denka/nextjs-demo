import Redis from 'ioredis';

async function test() {
  const redis = new Redis({
    port: 6379,
  });
  await redis.set('c', 222);
  const keys = await redis.keys('*');
  console.log(keys);
}

test();

import { Redis } from 'ioredis';

function getRedisSessionId(sid: string): string {
  return `ssid:${sid}`;
}

class RedisSessionStore {
  client: Redis;
  constructor(client: Redis) {
    this.client = client;
  }
  async get(sid: string): Promise<any> {
    const id = getRedisSessionId(sid);
    const data: any = await this.client.get(id);
    if (!data) {
      return null;
    }
    try {
      const result = JSON.parse(data);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
  async set(sid: string, sess: any, timelimit?: number) {
    const id = getRedisSessionId(sid);
    let ttl = timelimit;
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000);
    }
    try {
      const sessStr = JSON.stringify(sess);
      if (ttl) {
        await this.client.setex(id, ttl, sessStr);
      } else {
        await this.client.set(id, sessStr);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async destroy(sid: string) {
    const id = getRedisSessionId(sid);
    await this.client.del(id);
  }
}

export default RedisSessionStore;

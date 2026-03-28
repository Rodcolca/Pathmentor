import request from 'supertest';
import { createApp } from '../src/app';
import { AppConfig } from '../src/config/env';

const config: AppConfig = {
  env: 'test',
  port: 0,
  openRouter: {
    apiKey: 'dummy',
    model: 'openrouter/free',
    baseUrl: 'https://openrouter.ai/api/v1'
  },
  allowedOrigins: []
};

const assert = (cond: unknown, msg: string) => {
  if (!cond) throw new Error(msg);
};

async function main() {
  const app = createApp(config);
  const res = await request(app).get('/health');
  assert(res.status === 200, 'status should be 200');
  assert(res.body.status === 'ok', 'body should contain ok');
  console.log('health.test.ts passed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

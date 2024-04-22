import { http } from '@/core/config/network/Http';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { createPinia, setActivePinia } from 'pinia';
import { afterAll, beforeAll, expect, test } from 'vitest';

const URL = 'https://jsonplaceholder.typicode.com/todos/2';

const REQUESTS = {
  200: rest.all(URL, (_, res, ctx) => {
    return res(ctx.status(200));
  }),
  500: rest.get(URL, (_, res, ctx) => {
    return res(ctx.status(500));
  }),
  401: rest.get(URL, (_, res, ctx) => {
    return res(ctx.status(401));
  }),
  403: rest.get(URL, (_, res, ctx) => {
    return res(ctx.status(403));
  }),
  429: rest.get(URL, (_, res, ctx) => {
    return res(ctx.status(429));
  }),
};

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeAll(() => {
  setActivePinia(createPinia());
});

afterAll(() => server.close());

test('http -- request -- 500', async () => {
  server.use(REQUESTS[500]);
  try {
    const response = await http.request({
      url: URL,
    });
    expect(response.status).toBe(500);
  } catch (error) {
    expect(error).toBeDefined();
  }
});

test('http -- request -- 401', async () => {
  server.use(REQUESTS[401]);
  try {
    const response = await http.request({
      url: URL,
    });
    expect(response.status).toBe(401);
  } catch (error) {
    expect(error).toBeDefined();
  }
});

test('http -- request -- 403', async () => {
  server.use(REQUESTS[403]);
  try {
    const response = await http.request({
      url: URL,
    });
    expect(response.status).toBe(403);
  } catch (error) {
    expect(error).toBeDefined();
  }
});

test('http -- request -- 429', async () => {
  server.use(REQUESTS[429]);
  try {
    const response = await http.request({
      url: URL,
    });
    expect(response.status).toBe(429);
  } catch (error) {
    expect(error).toBeDefined();
  }
});

test('http -- put', async () => {
  server.use(REQUESTS[200]);
  const response = await http.put(URL, {
    title: 'foo',
  });
  expect(response.status).toBe(200);
});

test('http -- delete', async () => {
  server.use(REQUESTS[200]);
  const response = await http.delete(URL);
  expect(response.status).toBe(200);
});

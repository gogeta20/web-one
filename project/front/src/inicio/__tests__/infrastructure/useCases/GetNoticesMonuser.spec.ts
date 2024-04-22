import { baseUrl, meEnvironment } from "@/core/__tests__/test-utils";
import { getNoticesMonuser } from "@/inicio/infrastructure/useCases/GetNoticesMonuser";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createPinia, setActivePinia } from "pinia";
import { afterAll, beforeAll, expect, test } from "vitest";

const server = setupServer();
const url = baseUrl("novas");
const response200 = rest.get(url, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ data: [] }));
});
const response404 = rest.get(url, (_, res, ctx) => {
  return res(ctx.status(404), ctx.json({ message: "ERROR" }));
});

beforeAll(() => {
  setActivePinia(createPinia());
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => server.close());

test("getNoticesMonuser -> Status 200", async () => {
  server.use(response200);
  const response = await getNoticesMonuser();
  expect(response).toHaveLength(0);
});

test("getNoticesMonuser -> Status 404", async () => {
  server.use(response404);
  try {
    await getNoticesMonuser();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    expect(error.data.message).toBe("ERROR");
  }
});

test("getNoticesMonuser -> InMemory", async () => {
  import.meta.env.MODE = meEnvironment;
  const response = await getNoticesMonuser();
  expect(response).toHaveLength(1);
});

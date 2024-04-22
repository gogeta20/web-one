import { baseUrl, meEnvironment } from "@/core/__tests__/test-utils";
import { checkAviso } from "@/inicio/infrastructure/useCases/CheckAviso";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createPinia, setActivePinia } from "pinia";
import { afterAll, beforeAll, expect, test } from "vitest";

const server = setupServer();
const url = baseUrl("marcar_avisos_leidos");
const response200 = rest.post(url, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json([]));
});
const response404 = rest.post(url, (_, res, ctx) => {
  return res(ctx.status(404), ctx.json({ message: "ERROR" }));
});

beforeAll(() => {
  setActivePinia(createPinia());
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => server.close());

test("checkAviso -> Status 200", async () => {
  server.use(response200);
  const response = await checkAviso("1");
  expect(response).toHaveLength(0);
});

test("checkAviso -> Status 404", async () => {
  server.use(response404);
  try {
    await checkAviso("1");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    expect(error.data.message).toBe("ERROR");
  }
});

test("checkAviso -> InMemory", async () => {
  import.meta.env.MODE = meEnvironment;
  const response = await checkAviso("1");
  expect(response).toHaveLength(1);
});

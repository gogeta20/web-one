import { logout } from "@/auth/infrastructure/useCases/logout";
import { baseUrl, meEnvironment } from "@/core/__tests__/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createPinia, setActivePinia } from "pinia";
import { afterAll, beforeAll, expect, test } from "vitest";

const server = setupServer();
const url = baseUrl("logout");
const response200 = rest.post(url, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(""));
});
const response404 = rest.post(url, (_, res, ctx) => {
  return res(ctx.status(404), ctx.json({ message: "ERROR" }));
});

beforeAll(() => {
  setActivePinia(createPinia());
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => server.close());

test("logout -> Status 200", async () => {
  server.use(response200);
  const response = await logout("user");
  expect(response).toBe("");
});

test("logout -> Status 404", async () => {
  server.use(response404);
  try {
    await logout("user");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    expect(error.data.message).toBe("ERROR");
  }
});

test("logout -> InMemory", async () => {
  import.meta.env.MODE = meEnvironment;
  const response = await logout("user");
  expect(response).toBe("");
});

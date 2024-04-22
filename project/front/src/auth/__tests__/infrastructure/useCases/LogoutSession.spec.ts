import { logoutSession } from "@/auth/infrastructure/useCases/LogoutSession";
import { baseUrl, meEnvironment } from "@/core/__tests__/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createPinia, setActivePinia } from "pinia";
import { afterAll, beforeAll, expect, test } from "vitest";

const server = setupServer();
const url = baseUrl("login/finish");
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

test("logoutSession -> Status 200", async () => {
  server.use(response200);
  const response = await logoutSession("user");
  expect(response).toBe("");
});

test("logoutSession -> Status 404", async () => {
  server.use(response404);
  try {
    await logoutSession("user");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    expect(error.data.message).toBe("ERROR");
  }
});

test("logoutSession -> InMemory", async () => {
  import.meta.env.MODE = meEnvironment;
  const response = await logoutSession("user");
  expect(response).toBe("");
});

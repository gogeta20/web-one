import { checkCASExtranet } from "@/auth/infrastructure/useCases/CheckCASExtranet";
import { baseUrl, meEnvironment } from "@/core/__tests__/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createPinia, setActivePinia } from "pinia";
import { afterAll, beforeAll, expect, test } from "vitest";

const server = setupServer();
const url = baseUrl("login/extranet/cas");
const response200 = rest.get(url, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({}));
});
const response404 = rest.get(url, (_, res, ctx) => {
  return res(ctx.status(404), ctx.json({ message: "ERROR" }));
});

beforeAll(() => {
  setActivePinia(createPinia());
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => server.close());

test("checkCASExtranet -> Status 200", async () => {
  server.use(response200);
  const response = await checkCASExtranet();
  expect(response).toBeUndefined();
});

test("checkCASExtranet -> Status 404", async () => {
  server.use(response404);
  try {
    await checkCASExtranet();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    expect(error.data.message).toBe("ERROR");
  }
});

test("checkCASExtranet -> InMemory", async () => {
  import.meta.env.MODE = meEnvironment;
  const response = await checkCASExtranet();
  expect(response).toBeUndefined();
});

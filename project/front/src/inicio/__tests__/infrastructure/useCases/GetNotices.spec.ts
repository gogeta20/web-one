import { baseUrl, meEnvironment } from "@/core/__tests__/test-utils";
import { inicioFiltersDefault } from "@/inicio/dominio/InicioFilters";
import { getNotices } from "@/inicio/infrastructure/useCases/GetNotices";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createPinia, setActivePinia } from "pinia";
import { afterAll, beforeAll, expect, test } from "vitest";

const server = setupServer();
const url = baseUrl("avisos/all/");
const response200 = rest.post(url, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ data: [] }));
});
const response404 = rest.post(url, (_, res, ctx) => {
  return res(ctx.status(404), ctx.json({ message: "ERROR" }));
});

beforeAll(() => {
  setActivePinia(createPinia());
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => server.close());

test("getNotices -> Status 200", async () => {
  server.use(response200);
  const response = await getNotices({ ...inicioFiltersDefault });
  expect(response).toHaveLength(0);
});

test("getNotices -> Status 404", async () => {
  server.use(response404);
  try {
    await getNotices({ ...inicioFiltersDefault });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    expect(error.data.message).toBe("ERROR");
  }
});

test("getNotices -> InMemory", async () => {
  import.meta.env.MODE = meEnvironment;
  const response = await getNotices({ ...inicioFiltersDefault });
  expect(response).toHaveLength(4);
});

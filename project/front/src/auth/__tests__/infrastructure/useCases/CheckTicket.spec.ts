import userMock from "@/auth/infrastructure/mocks/userMock.json";
import { checkTicket } from "@/auth/infrastructure/useCases/CheckTicket";
import { baseUrl, meEnvironment } from "@/core/__tests__/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createPinia, setActivePinia } from "pinia";
import { afterAll, beforeAll, expect, test } from "vitest";

const server = setupServer();
const url = baseUrl("login/intranet/cas/ticket/234");
const response200 = rest.post(url, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(userMock));
});
const response404 = rest.post(url, (_, res, ctx) => {
  return res(ctx.status(404), ctx.json({ message: "ERROR" }));
});

beforeAll(() => {
  setActivePinia(createPinia());
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => server.close());

test("checkTicket -> Status 200", async () => {
  server.use(response200);
  const response = await checkTicket("234");
  expect(response.id).toBe("ue08031");
  expect(response.nombre).toBe("Usuario Entorno Dev");
  expect(response.tipoLogin).toBe("ldap");
  expect(response.permissions).toBeTruthy();
  expect(response.token).toBe("f2fce764-65fb-4522-81b0-2292f9b6be29");
  expect(response.permissions).toStrictEqual(userMock.permissions);
});

test("checkTicket -> Status 404", async () => {
  server.use(response404);
  try {
    await checkTicket("234");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    expect(error.data.message).toBe("ERROR");
  }
});

test("checkTicket -> InMemory", async () => {
  import.meta.env.MODE = meEnvironment;
  const response = await checkTicket("ticket");
  expect(response.id).toBe("ue08031");
  expect(response.nombre).toBe("Usuario Entorno Dev");
  expect(response.tipoLogin).toBe("ldap");
  expect(response.permissions).toBeTruthy();
  expect(response.token).toBe("f2fce764-65fb-4522-81b0-2292f9b6be29");
  expect(response.permissions).toStrictEqual(userMock.permissions);
});

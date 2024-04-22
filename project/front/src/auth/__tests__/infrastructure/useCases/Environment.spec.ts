import userMock from "@/auth/infrastructure/mocks/userMock.json";
import { environment } from "@/auth/infrastructure/useCases/Environment";
import { meEnvironment } from "@/core/__tests__/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeAll, expect, test } from "vitest";

beforeAll(() => {
  setActivePinia(createPinia());
});

test("environment -> InMemory", async () => {
  process.env.NODE_ENV = meEnvironment;
  const response = await environment();
  expect(response.usuario).toBe("ue08031");
  expect(response.nombre).toBe("Usuario Entorno Dev");
  expect(response.tipoLogin).toBe("ldap");
  expect(response.permissions).toBeTruthy();
  expect(response.token).toBe("f2fce764-65fb-4522-81b0-2292f9b6be29");
  expect(response.permissions).toStrictEqual(userMock.permissions);
});

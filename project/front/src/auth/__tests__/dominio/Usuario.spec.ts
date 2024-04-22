import { Usuario } from "@/auth/dominio/Usuario";
import { beforeAll, expect, test } from "vitest";

let user: Usuario;

beforeAll(() => {
  user = new Usuario("test", true, "id", "token", {}, "ldap");
});

test("user", async () => {
  expect(user.nombre).toBe("test");
  expect(user.isAuthenticated).toBeTruthy();
  expect(user.id).toBe("id");
  expect(user.token).toBe("token");
  expect(user.permissions).toStrictEqual({});
  expect(user.tipoLogin).toBe("ldap");
});

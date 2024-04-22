import { authRouter } from "@/auth/router/authRouter";
import { expect, test } from "vitest";

test("authRouter", () => {
  expect(authRouter[0].path).toBe("/Autenticacion");
  expect(authRouter[0].name).toBe("autenticacion");
  expect(authRouter[0].redirect).toBe("Autenticacion/indexExtranet");
  expect(authRouter[0].meta.requiresAuth).toBeFalsy();
  expect(authRouter[0].children).toHaveLength(3);
});

test("authRouter -> dev", () => {
  expect(authRouter[0].children[0].path).toBe("dev");
  expect(authRouter[0].children[0].name).toBe("dev");
  expect(authRouter[0].children[0].component()).toBeDefined();
});

test("authRouter -> indexExtranet", () => {
  expect(authRouter[0].children[1].path).toBe("indexExtranet");
  expect(authRouter[0].children[1].name).toBe("extranet");
  expect(authRouter[0].children[1].component()).toBeDefined();
});

test("authRouter -> indexIntranet", () => {
  expect(authRouter[0].children[2].path).toBe("indexIntranet");
  expect(authRouter[0].children[2].name).toBe("intranet");
  expect(authRouter[0].children[2].component()).toBeDefined();
});

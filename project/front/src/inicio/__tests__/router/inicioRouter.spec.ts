import { inicioRouter } from "@/inicio/router/inicioRouter";
import { expect, test } from "vitest";

test("inicioRouter", () => {
  expect(inicioRouter[0].path).toBe("/inicio");
  expect(inicioRouter[0].name).toBe("home");
  expect(inicioRouter[0].component()).toBeDefined();
  expect(inicioRouter[0].meta.requiresAuth).toBeTruthy();
});

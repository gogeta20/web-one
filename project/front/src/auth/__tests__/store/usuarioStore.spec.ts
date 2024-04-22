import { permissionsDefault, type Permission } from "@/auth/dominio/Permissions";
import { useUsuarioStore } from "@/auth/store/usuarioStore";
import { meEnvironment } from "@/core/__tests__/test-utils";
import { createPinia, setActivePinia, type Store } from "pinia";
import { beforeAll, expect, test, vi } from "vitest";

let usuarioStore: Store<
  "usuario",
  {
    roles: never[];
    datos: {
      userId: string;
      nombre: string;
      isAuthenticated: boolean;
      casActive: boolean;
      token: string;
      environment: string;
      permissions: {
        [x: string]: Permission;
      };
      lang: string;
      typeLogin: string;
    };
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  {
    check($nameCookie: string): Promise<void>;
    authResolve(p: string): Promise<void>;
    checkTicket(ticket: string): Promise<boolean>;
    clearData(): void;
    logout(): Promise<string>;
    redirectInicio(): void;
    savePath(last: string): Promise<void>;
    sessionOut(): Promise<void>;
    changeLanguage(lang: string): void;
    environment(): Promise<boolean>;
    getPermission(keyToSearch: string): null | Permission;
  }
>;
import.meta.env.MODE = meEnvironment;

beforeAll(() => {
  setActivePinia(createPinia());
  usuarioStore = useUsuarioStore();
  const mockResponse = vi.fn();
  Object.defineProperty(window, "location", {
    value: {
      hash: {
        endsWith: mockResponse,
        includes: mockResponse,
      },
      assign: mockResponse,
    },
    writable: true,
  });
});

test("usuarioStore -> state", async () => {
  expect(usuarioStore.$state.roles).toHaveLength(0);
  expect(usuarioStore.$state.datos.userId).toBe("");
  expect(usuarioStore.$state.datos.nombre).toBe("");
  expect(usuarioStore.$state.datos.isAuthenticated).toBeFalsy();
  expect(usuarioStore.$state.datos.casActive).toBeFalsy();
  expect(usuarioStore.$state.datos.token).toBe("");
  expect(usuarioStore.$state.datos.environment).toBe("");
  expect(usuarioStore.$state.datos.permissions).toStrictEqual({ ...permissionsDefault });
  expect(usuarioStore.$state.datos.lang).toBe("gl");
  expect(usuarioStore.$state.datos.typeLogin).toBeFalsy();
});

test("usuarioStore -> check", async () => {
  expect(await usuarioStore.check("ldap")).toBeUndefined();
});

test("usuarioStore -> checkTicket", async () => {
  expect(await usuarioStore.checkTicket("ticket")).toBeTruthy();
});

test("usuarioStore -> clearData", async () => {
  expect(usuarioStore.clearData()).toBeUndefined();
});

test("usuarioStore -> logout", async () => {
  expect(await usuarioStore.logout()).toBe("");
});

test("usuarioStore -> savePath", async () => {
  expect(await usuarioStore.savePath("inicio")).toBeUndefined();
});

test("usuarioStore -> changeLanguage", async () => {
  expect(usuarioStore.changeLanguage("es")).toBeUndefined();
});

test("usuarioStore -> environment", async () => {
  expect(usuarioStore.environment()).toBeTruthy();
});

test("usuarioStore -> getPermission", async () => {
  expect(usuarioStore.getPermission("es")).toBe(null);
});

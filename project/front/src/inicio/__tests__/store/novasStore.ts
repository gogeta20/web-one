import type { Permission } from "@/auth/dominio/Permissions";
import { meEnvironment } from "@/core/__tests__/test-utils";
import { inicioFiltersDefault, type InicioFilters } from "@/inicio/dominio/InicioFilters";
import type { Notices } from "@/inicio/dominio/Notices";
import type { NoticesAll } from "@/inicio/dominio/NoticesAll";
import type { NoticesMonuser } from "@/inicio/dominio/NoticesMonuser";
import type { NoticeToShow } from "@/inicio/dominio/NoticeToShow";
import { useNovasStore } from "@/inicio/store/novasStore";
import { createPinia, setActivePinia, type Store } from "pinia";
import { beforeAll, expect, test, vi } from "vitest";

const permision = {
  tipo: "",
  provincia: "",
  distrito: "",
  servizo: "",
};

let novasStore: Store<
  "novasStore",
  {
    novas: NoticesMonuser[];
    avisos: Notices[];
    filters: InicioFilters;
    allSort: NoticeToShow[];
    language: string;
    timeUpdateNovas: Date;
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  {
    novasMonusrStore(): Promise<void>;
    avisosStore($filters: InicioFilters, $permission: Permission, $language: string): Promise<void>;
    order($permission: Permission): Promise<void>;
    transmuteNotices(notices: Partial<NoticesAll>[]): NoticesAll[];
    mapDatos(union: NoticesAll[], $permission: Permission): NoticeToShow[];
    getAllStore(): NoticeToShow[];
    compareFilters(newFilters: InicioFilters): boolean;
  }
>;
import.meta.env.MODE = meEnvironment;

beforeAll(() => {
  setActivePinia(createPinia());
  novasStore = useNovasStore();
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

test("novasStore -> state", async () => {
  expect(novasStore.$state.novas).toHaveLength(0);
  expect(novasStore.$state.avisos).toHaveLength(0);
  expect(novasStore.$state.filters).toHaveLength(0);
  expect(novasStore.$state.allSort).toHaveLength(0);
  expect(novasStore.$state.language).toBe("gl");
  expect(novasStore.$state.timeUpdateNovas).toBe("");
});

test("novasStore -> novasMonusrStore", async () => {
  expect(await novasStore.novasMonusrStore()).toBeUndefined();
});

test("usuarioStore -> avisosStore", async () => {
  expect(
    await novasStore.avisosStore({ ...inicioFiltersDefault }, permision, "es")
  ).toBeUndefined();
});

test("usuarioStore -> order", async () => {
  expect(await novasStore.order(permision)).toBeUndefined();
});

test("usuarioStore -> transmuteNotices", async () => {
  expect(await novasStore.transmuteNotices([])).toHaveLength(0);
});

test("usuarioStore -> mapDatos", async () => {
  expect(await novasStore.mapDatos([], permision)).toHaveLength(0);
});

test("usuarioStore -> getAllStore", async () => {
  expect(await novasStore.getAllStore()).toHaveLength(0);
});

test("usuarioStore -> compareFilters", async () => {
  expect(await novasStore.compareFilters({ ...inicioFiltersDefault })).toBeFalsy();
});

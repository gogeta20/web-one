import { CookiesStore } from "@/core/config/CookiesStore";
import Cookies from "js-cookie";
import { createPinia, setActivePinia } from "pinia";
import { beforeAll } from "vitest";

beforeAll(() => {
  Cookies.set(CookiesStore.LDAP, "token", { path: "/" });
  setActivePinia(createPinia());
});

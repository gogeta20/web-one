import Cookies from "js-cookie";
import { defineStore } from "pinia";
import type { PersistedStateOptions } from "pinia-plugin-persistedstate";

const COOKIE_LANGUAGE =
  "org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE";

export const useI18nStore = defineStore("i18n", {
  state: () => {
    return {
      language: "gl",
    };
  },
  actions: {
    setLanguage(locale: string) {
      this.language = locale;
      Cookies.set(COOKIE_LANGUAGE, locale);
    },
    getLanguage() {
      return this.language;
    },
  },
  persist: <PersistedStateOptions>{
    key: "__i18n__",
    storage: window.localStorage,
    overwrite: true,
  },
});

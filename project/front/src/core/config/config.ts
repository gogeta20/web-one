import { CookiesStore } from "@/core/config/CookiesStore";
import Cookies from "js-cookie";

interface RootConfig {
  environment: string;
  isProduction: boolean;
  nombreAPP: string;
  version: string;
  apiURL: string;
  apiCustom: string;
  loginURL: string;
  logoutURL: string;
  baseURL: string;
  initURL: string;
  prefijo: string;
  contorno: string;
}
export const customCookie = Cookies.withAttributes({
  path: "/xorfor3",
  domain: window.location.hostname,
});

export const rootConfig: RootConfig = {
  environment: customCookie.get(CookiesStore.ENVIRONMENT) || import.meta.env.MODE,
  isProduction: import.meta.env.MODE === "production",
  nombreAPP: import.meta.env.VITE_NOMBRE_APP,
  baseURL: import.meta.env.BASE_URL,
  version: customCookie.get(CookiesStore.APP_VERSION) || import.meta.env.VITE_VERSION,
  apiURL: import.meta.env.VITE_API_URL,
  apiCustom: import.meta.env.VITE_API_CUSTOM_URL,
  loginURL: import.meta.env.VITE_LOGIN_URL,
  logoutURL: import.meta.env.VITE_LOGOUT_URL,
  initURL: import.meta.env.VITE_INIT_URL,
  prefijo: import.meta.env.VITE_PRE_FIJO,
  contorno: import.meta.env.VITE_VERSION_CONTORNO,
};

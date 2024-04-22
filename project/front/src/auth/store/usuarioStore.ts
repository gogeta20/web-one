import { permissionsDefault, type Permission } from "@/auth/dominio/Permissions";
import { checkCAS } from "@/auth/infrastructure/useCases/CheckCAS";
import { checkCASExtranet } from "@/auth/infrastructure/useCases/CheckCASExtranet";
import { checkTicket } from "@/auth/infrastructure/useCases/CheckTicket";
import { environment } from "@/auth/infrastructure/useCases/Environment";
import { getPermissions } from "@/auth/infrastructure/useCases/GetPermissions";
import { logout } from "@/auth/infrastructure/useCases/logout";
import { logoutSession } from "@/auth/infrastructure/useCases/LogoutSession";
import { customCookie, rootConfig } from "@/core/config/config";
import { usePageLoadStore } from "@/core/stores/pageLoad";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { defineStore } from "pinia";
import type { PersistedStateOptions } from "pinia-plugin-persistedstate";
const PATH_LOGIN_EXTRANET = "/Autenticacion/indexExtranet";
const PATH_LOGIN_INTRANET = "/Autenticacion/indexIntranet";
const PATH_INTRANET = "/Autenticacion/dev";
const PATH_LOGOUT = "/logout";
const PATH_LDAP = "/ldap";
const PATH_CEXTRANET = "/casExtranet";
const PATH_CINTRANET = "/casIntranet";
const SUFIJO_COOKIE = "LastPath";
const USER_INTRANET = "casIntranet";
const USER_EXTRANET = "casExtranet";

export const useUsuarioStore = defineStore("usuario", {
  state: () => {
    return {
      roles: [],
      datos: {
        userId: "",
        nombre: "",
        isAuthenticated: false,
        casActive: false,
        token: "",
        environment: "",
        permissions: { ...permissionsDefault },
        lang: "gl",
        typeLogin: "",
      },
    };
  },
  actions: {
    async check($nameCookie: string) {
      const meCookies =
        rootConfig.environment === "preview"
          ? customCookie.get("ldap")
          : customCookie.get($nameCookie.replace("/", ""));
      if (meCookies && !this.datos.isAuthenticated) {
        const usuario = JSON.parse(meCookies);
        this.datos.isAuthenticated = true;
        this.datos.nombre = usuario.nombre;
        this.datos.userId = usuario.usuario;
        this.datos.token = usuario.token;
        this.datos.typeLogin = usuario.tipoLogin;
        if (Object.keys(this.datos.permissions).length === 0) {
          const pageLoadStore = usePageLoadStore();
          pageLoadStore.showPageLoad();
          pageLoadStore.sendMessage("Entrando ...");
          this.datos.permissions = await getPermissions();
          pageLoadStore.hiddenPageLoad();
          pageLoadStore.sendMessage("");
        }
        this.redirectInicio();
      }
    },
    async authResolve(p: string) {
      let redirectUrl = "";
      let checkedUsuarioCAS = undefined;
      const pageLoadStore = usePageLoadStore();
      pageLoadStore.showPageLoad();
      pageLoadStore.sendMessage("Cargando...");
      try {
        if (p == PATH_LOGIN_EXTRANET || p == "/") {
          this.datos.typeLogin = USER_EXTRANET;
          checkedUsuarioCAS = await checkCASExtranet();
        } else if (p == PATH_LOGIN_INTRANET) {
          this.datos.typeLogin = USER_INTRANET;
          checkedUsuarioCAS = await checkCAS();
        } else {
          const base = UtilHelper.getBaseUrl();
          redirectUrl = `${base}/404`;
        }
        if (checkedUsuarioCAS) {
          redirectUrl = checkedUsuarioCAS.login;
          this.datos.casActive = checkedUsuarioCAS.activo;
        }
        window.location.assign(redirectUrl);
      } catch (err) {
        throw Error(`Error ${err}`);
      } finally {
        pageLoadStore.hiddenPageLoad();
        pageLoadStore.sendMessage("");
      }
    },
    async checkTicket(ticket: string) {
      const usuario = await checkTicket(ticket);
      if (usuario) {
        this.datos.isAuthenticated = usuario.isAuthenticated;
        this.datos.nombre = usuario.nombre;
        this.datos.userId = usuario.id;
        this.datos.token = usuario.token;
        this.datos.permissions = usuario.permissions;
        this.datos.typeLogin = usuario.tipoLogin;
        return true;
      }
      return false;
    },
    clearData() {
      this.datos.userId = "";
      this.datos.nombre = "";
      this.datos.isAuthenticated = false;
      this.datos.casActive = false;
      this.datos.token = "";
      this.datos.permissions = { ...permissionsDefault };
      this.datos.typeLogin = "";
    },
    async logout() {
      const t: string = this.datos.typeLogin;
      this.clearData();
      UtilHelper.deleteCookie(t);
      UtilHelper.deleteCookie(t + SUFIJO_COOKIE);
      return await logout(t);
    },
    redirectInicio() {
      const nameCookie = this.datos.typeLogin + SUFIJO_COOKIE;
      const lastPath = customCookie.get(nameCookie);
      const base = UtilHelper.getBaseUrl();
      let inicio = "";
      if (lastPath) {
        inicio = lastPath;
      } else {
        inicio = rootConfig.initURL;
      }
      window.location.assign(`${base}${inicio}`);
    },
    async savePath(last: string) {
      if (this.datos.isAuthenticated) {
        const publicChargeCookie: string[] = [
          PATH_LOGOUT,
          PATH_LDAP,
          PATH_CEXTRANET,
          PATH_CINTRANET,
          PATH_INTRANET,
        ];
        const isCharge = publicChargeCookie.includes(last);
        if (!isCharge) {
          const nameCookie = this.datos.typeLogin + SUFIJO_COOKIE;
          UtilHelper.createCookie(nameCookie, last);
        }
      }
    },
    async sessionOut() {
      let redirectUrl: string;
      const t = this.datos.typeLogin;
      const pageLoadStore = usePageLoadStore();
      pageLoadStore.showPageLoad();
      pageLoadStore.sendMessage("Saliendo...");
      if (t == "ldap") {
        rootConfig.logoutURL;
        const base = UtilHelper.getBaseUrl();
        redirectUrl = `${base}${PATH_INTRANET}`;
      } else {
        redirectUrl = await logoutSession(this.datos.typeLogin);
      }
      this.clearData();
      UtilHelper.deleteCookie(t);
      pageLoadStore.hiddenPageLoad();
      pageLoadStore.sendMessage("");
      window.location.assign(redirectUrl);
    },
    changeLanguage(lang: string) {
      this.datos.lang = lang;
    },
    async environment() {
      const usuarioEnv = await environment();
      if (usuarioEnv) {
        this.datos.environment = usuarioEnv.token;
        return true;
      }
      return false;
    },
    getPermission(keyToSearch: string): null | Permission {
      let result: null | Permission = null;
      Object.entries(this.datos.permissions).forEach(([key, value]) => {
        if (key === keyToSearch) {
          result = value;
        }
      });
      return result;
    },
    getTypeUser() {
      return this.datos.typeLogin;
    },
    isUserExtranet() {
      return this.datos.typeLogin == USER_EXTRANET;
    },
  },
  persist: <PersistedStateOptions>{
    key: "#user",
    storage: window.sessionStorage,
    paths: ["datos"],
    overwrite: true,
  },
});

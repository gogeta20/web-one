import userExtranetMock from "@/auth/infrastructure/mocks/userExtranetMock.json";
import userMock from "@/auth/infrastructure/mocks/userMock.json";
import { authRouter } from "@/auth/router/authRouter";
import { useUsuarioStore } from "@/auth/store/usuarioStore";
import { inicioRouter } from "@/inicio/router/inicioRouter";
import { sharedRouter } from "@/shared/router/sharedRouter";
import Cookies from "js-cookie";
import { createRouter, createWebHistory } from "vue-router";
import { CookiesStore } from "../config/CookiesStore";
import { rootConfig } from "../config/config";

const routes = [
  ...authRouter,
  {
    name: "home",
    path: "/",
    component: () => import("@/core/layout/maqintLayout/MaqintLayout.vue"),
    children: [...inicioRouter],
  },
  {
    name: "about",
    path: "/about",
    component: () => import("@/core/layout/maqintLayout/MaqintLayout.vue"),
  },
  {
    name: "contact",
    path: "/contact",
    component: () => import("@/core/layout/maqintLayout/MaqintLayout.vue"),
  },
  // {
  //   name: "altasPO",
  //   path: "/proxecto-ordenacion",
  //   component: () => import("@/core/layout/maqintLayout/MaqintLayout.vue"),
  //   children: [...AltaSolicitudeRouterPO],
  // },
  // {
  //   name: "altasDSX",
  //   path: "/doc-simple-xestion",
  //   component: () => import("@/core/layout/maqintLayout/MaqintLayout.vue"),
  //   children: [...AltaSolicitudeRouterDSX],
  // },
  // {
  //   name: "altasDCX",
  //   path: "/doc-compartido-xestion",
  //   component: () => import("@/core/layout/maqintLayout/MaqintLayout.vue"),
  //   children: [...AltaSolicitudeRouterDCX],
  // },
  // {
  //   path: "/consulta",
  //   name: "consulta",
  //   redirect: "/consulta",
  //   component: () => import("@/core/layout/maqintLayout/MaqintLayout.vue"),
  //   children: [...consultaInstrumentosRouter],
  // },
    // {
  //   path: "/gis",
  //   name: "gis",
  //   component: () => import("@/gis/views/GisView.vue"),
  // },
  {
    path: "/404",
    name: "404",
    component: () => import("@/core/views/404Layout.vue"),
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/core/views/403Layout.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/core/views/500Layout.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("@/core/views/LogoutView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/core/views/404Layout.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/core/layout/maqintLayout/MaqintLayout.vue"),
    children: [...sharedRouter],
  },
  {
    path: "/axuda",
    name: "axuda",
    component: () => import("@/core/layout/maqintLayout/MaqintLayout.vue"),
    children: [...sharedRouter],
  },
];

const PATH_INTRANET = "/Autenticacion/dev";

const history = createWebHistory(import.meta.env.BASE_URL);

const router = createRouter({
  history,
  routes: routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

const loginInMemory = () => {
  if (rootConfig.environment === "preview") {
    Cookies.set(CookiesStore.LDAP, JSON.stringify(userMock), { path: "/" });
  }
  if (rootConfig.environment === "extranet") {
    Cookies.set(CookiesStore.EXTRANET, JSON.stringify(userExtranetMock), { path: "/" });
  }
};

router.beforeEach(async (to, _, next) => {
  const query = to.query._referer;
  if (query) {
    next({ path: "/", query: {} });
  } else {
    next();
  }
});

router.beforeEach(async (to, _, next) => {
  const usuarioStore = useUsuarioStore();

  loginInMemory();

  const errorPages = ["/403", "/404", "/500"];
  const publicPages: string[] = ["/logout", PATH_INTRANET];
  const isError = errorPages.includes(to.path);
  const isPublic = publicPages.includes(to.path);

  await usuarioStore.check(to.path);

  const isLogged = usuarioStore.datos.isAuthenticated;
  await usuarioStore.savePath(to.path);
  // if (!isLogged && !isPublic && !isError) {
  //   await usuarioStore.authResolve(to.path);
  //   next();
  // } else if (isLogged && isPublic) {
  //   next({ path: "/inicio" });
  // } else {
    next();
  // }
});

export default router;

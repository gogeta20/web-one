export const inicioRouter = [
  {
    name: "ini",
    path: "/inicio",
    component: () => import("@/inicio/views/InicioView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "second",
    path: "/second",
    component: () => import("@/inicio/views/SecondView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

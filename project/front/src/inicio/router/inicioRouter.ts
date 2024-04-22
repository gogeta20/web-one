export const inicioRouter = [
  {
    name: "home",
    path: "/inicio",
    component: () => import("@/inicio/views/InicioView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

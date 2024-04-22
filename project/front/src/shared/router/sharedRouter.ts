export const sharedRouter = [
  {
    path: "/error",
    name: "error",
    component: () => import("@/shared/views/ErrorView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/axuda",
    name: "axuda",
    component: () => import("@/shared/views/Ayuda/AyudaView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

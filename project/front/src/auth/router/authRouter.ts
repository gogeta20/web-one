export const authRouter = [
  {
    path: "/Autenticacion",
    name: "autenticacion",
    redirect: "Autenticacion/indexExtranet",
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "dev",
        name: "dev",
        component: () => import("@/auth/views/LoginView.vue"),
      },
      {
        path: "indexExtranet",
        name: "extranet",
        component: () => import("@/auth/views/EmptyView.vue"),
      },
      {
        path: "indexIntranet",
        name: "intranet",
        component: () => import("@/auth/views/EmptyView.vue"),
      },
    ],
  },
];

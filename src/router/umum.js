export const umum = [
  {
    meta: {
      title: "Pengelolaan Persuratan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/persuratan/list",
    name: "list-persuratan",
    component: () => import("@/views/umum/persuratan/Data.vue"),
  },
  {
    meta: {
      title: "Pengelolaan Arsip",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/arsip/list",
    name: "list-arsip",
    component: () => import("@/views/umum/arsip/Data.vue"),
  },
];

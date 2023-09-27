export const keuangan = [
  {
    meta: {
      title: "Pengelolaan Anggaran",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/anggaran/list",
    name: "list-anggaran",
    component: () => import("@/views/keuangan/anggaran/Data.vue"),
  },
];

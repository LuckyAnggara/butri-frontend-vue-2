export const keuangan = [
  {
    meta: {
      title: "Pengelolaan Anggaran",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/realisasi-anggaran/list",
    name: "list-realisasi-anggaran",
    component: () => import("@/views/keuangan/anggaran/Data.vue"),
  },
];

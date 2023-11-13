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
  {
    meta: {
      title: "Kinerja Keuangan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/kinerja-keuangan/list",
    name: "list-kinerja-keuangan",
    component: () => import("@/views/keuangan/kinerja/Data.vue"),
  },
  {
    meta: {
      title: "Indikator Kinerja Pelaksana Anggaran",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/ikpa/list",
    name: "list-ikpa",
    component: () => import("@/views/keuangan/ikpa/Data.vue"),
  },
];

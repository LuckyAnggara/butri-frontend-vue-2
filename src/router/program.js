export const program = [
  {
    meta: {
      title: "Indikator Kinerja Utama",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/iku/list",
    name: "iku-list",
    component: () => import("@/views/Program/Iku/DataMaster.vue"),
  },
  {
    meta: {
      title: "Indikator Kinerja Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/ikk/list",
    name: "ikk-list",
    component: () => import("@/views/Program/Ikk/DataMaster.vue"),
  },
];

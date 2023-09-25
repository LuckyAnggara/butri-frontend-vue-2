export const admin = [
  {
    meta: {
      title: "Indikator Kinerja Utama",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/iku/list",
    name: "iku-list",
    component: () => import("@/views/Admin/Iku/DataMaster.vue"),
  },
  {
    meta: {
      title: "Indikator Kinerja Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/ikk/list",
    name: "ikk-list",
    component: () => import("@/views/Admin/Ikk/DataMaster.vue"),
  },
];

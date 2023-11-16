import { all } from "./all";

export const wilayah = [
  {
    meta: {
      title: "Pengelolaan Data Pengawasan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/pengawasan/list",
    name: "list-pengawasan",
    component: () => import("@/views/wilayah/pengawasan/Data.vue"),
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
  {
    meta: {
      title: "Laporan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/wilayah/laporan/download/list",
    name: "list-laporan-wilayah-download",
    component: () => import("@/views/wilayah/laporan/DataMaster.vue"),
  },
];

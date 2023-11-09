export const laporan = [
  {
    meta: {
      title: "Laporan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/laporan/download/list",
    name: "list-laporan-download",
    component: () => import("@/views/admin/laporan/DataMaster.vue"),
  },
];

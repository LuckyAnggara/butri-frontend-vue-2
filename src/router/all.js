export const all = [
  {
    meta: {
      title: "Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/kegiatan/list",
    name: "list-kegiatan",
    component: () => import("@/views/All/DataKegiatan.vue"),
  },
  {
    meta: {
      title: "Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/kegiatan/pengembangan/new",
    name: "new-kegiatan",
    component: () => import("@/views/All/NewKegiatan.vue"),
  },
];

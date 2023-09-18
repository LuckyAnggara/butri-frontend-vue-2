export const all = [
  {
    meta: {
      title: "Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/kegiatan/list",
    name: "list-kegiatan",
    component: () => import("@/views/All/Kegiatan/DataKegiatan.vue"),
  },
  {
    meta: {
      title: "Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/kegiatan/new",
    name: "new-kegiatan",
    component: () => import("@/views/All/Kegiatan/NewKegiatan.vue"),
  },
  {
    meta: {
      title: "Program Unggulan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/program-unggulan/list",
    name: "list-program-unggulan",
    component: () => import("@/views/All/Programunggulan/Data.vue"),
  },
  {
    meta: {
      title: "Program Unggulan",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/program-unggulan/new",
    name: "new-program-unggulan",
    component: () => import("@/views/All/Programunggulan/New.vue"),
  },
];

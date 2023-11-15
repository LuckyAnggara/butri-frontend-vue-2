export const admin = [
  {
    meta: {
      title: "Indikator Kinerja Utama",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/iku/list",
    name: "list-iku",
    component: () => import("@/views/admin/iku/DataMaster.vue"),
  },
  {
    meta: {
      title: "Indikator Kinerja Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/ikk/list",
    name: "ikk-list",
    component: () => import("@/views/admin/ikk/DataMaster.vue"),
  },
  {
    meta: {
      title: "Program Unggulan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/program-unggulan/list",
    name: "list-program-unggulan",
    component: () => import("@/views/admin/programunggulan/DataMaster.vue"),
  },
  {
    meta: {
      title: "Daftar Isian Pelaksanaan Anggaran",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/dipa/list",
    name: "list-dipa",
    component: () => import("@/views/admin/dipa/DataMaster.vue"),
  },
  {
    meta: {
      title: "User Management",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/user/management",
    name: "management-user",
    component: () => import("@/views/admin/user/DataMaster.vue"),
  },
];

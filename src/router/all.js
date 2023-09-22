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
  {
    meta: {
      title: "Capaian Indikator Kinerja Utama",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/capaian/iku/list",
    name: "list-capaian-iku",
    component: () => import("@/views/All/Capaian/Iku/Data.vue"),
  },
  {
    meta: {
      title: "Capaian Indikator Kinerja Utama",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/capaian/iku/new",
    name: "new-capaian-iku",
    component: () => import("@/views/All/Capaian/Iku/New.vue"),
  },
  {
    meta: {
      title: "Capaian Indikator Kinerja Utama",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/capaian/iku/:id/detail",
    name: "edit-capaian-iku",
    component: () => import("@/views/All/Capaian/Iku/Edit.vue"),
  },
  {
    meta: {
      title: "Capaian Indikator Kinerja Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/capaian/ikk/list",
    name: "list-capaian-ikk",
    component: () => import("@/views/All/Capaian/Ikk/Data.vue"),
  },
  {
    meta: {
      title: "Capaian Indikator Kinerja Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/capaian/ikk/new",
    name: "new-capaian-ikk",
    component: () => import("@/views/All/Capaian/Ikk/New.vue"),
  },
  {
    meta: {
      title: "Detail Capaian Indikator Kinerja Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/capaian/ikk/:id/detail",
    name: "edit-capaian-ikk",
    component: () => import("@/views/All/Capaian/Ikk/Edit.vue"),
  },
  {
    meta: {
      title: "Capaian Lainnya",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/capaian/lainnya/list",
    name: "list-capaian-lainnya",
    component: () => import("@/views/All/Capaian/Lainnya/Data.vue"),
  },
  {
    meta: {
      title: "Capaian Lainnya",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/capaian/lainnya/new",
    name: "new-capaian-lainnya",
    component: () => import("@/views/All/Capaian/Lainnya/New.vue"),
  },
];

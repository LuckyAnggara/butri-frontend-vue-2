export const all = [
  {
    meta: {
      title: "Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/kegiatan/list",
    name: "list-kegiatan",
    component: () => import("@/views/all/kegiatan/DataKegiatan.vue"),
  },

  {
    meta: {
      title: "Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/kegiatan/new",
    name: "new-kegiatan",
    component: () => import("@/views/all/kegiatan/NewKegiatan.vue"),
  },
  {
    meta: {
      title: "Program Unggulan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/capaian/program-unggulan/list",
    name: "list-capaian-program-unggulan",
    component: () => import("@/views/all/programunggulan/Data.vue"),
  },
  {
    meta: {
      title: "Program Unggulan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/capaian/program-unggulan/new",
    name: "new-capaian-program-unggulan",
    component: () => import("@/views/all/programunggulan/New.vue"),
  },
  {
    meta: {
      title: "Capaian Indikator Kinerja Utama",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/capaian/iku/list",
    name: "list-capaian-iku",
    component: () => import("@/views/all/capaian/iku/Data.vue"),
  },
  {
    meta: {
      title: "Capaian Indikator Kinerja Utama",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/capaian/iku/new",
    name: "new-capaian-iku",
    component: () => import("@/views/all/capaian/iku/New.vue"),
  },
  {
    meta: {
      title: "Capaian Indikator Kinerja Utama",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/capaian/iku/:id/edit",
    name: "edit-capaian-iku",
    component: () => import("@/views/all/capaian/iku/Edit.vue"),
  },
  {
    meta: {
      title: "Capaian Indikator Kinerja Utama",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/capaian/iku/:id/detail",
    name: "detail-capaian-iku",
    component: () => import("@/views/all/capaian/iku/Detail.vue"),
  },
  {
    meta: {
      title: "Capaian Indikator Kinerja Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/capaian/ikk/list",
    name: "list-capaian-ikk",
    component: () => import("@/views/all/capaian/ikk/Data.vue"),
  },
  {
    meta: {
      title: "Capaian Indikator Kinerja Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/capaian/ikk/new",
    name: "new-capaian-ikk",
    component: () => import("@/views/all/capaian/ikk/New.vue"),
  },
  {
    meta: {
      title: "Detail Capaian Indikator Kinerja Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/capaian/ikk/:id/edit",
    name: "edit-capaian-ikk",
    component: () => import("@/views/all/capaian/ikk/Edit.vue"),
  },
  {
    meta: {
      title: "Detail Capaian Indikator Kinerja Kegiatan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/capaian/ikk/:id/detail",
    name: "detail-capaian-ikk",
    component: () => import("@/views/all/capaian/ikk/Detail.vue"),
  },

  {
    meta: {
      title: "Risiko - Penetapan Tujuan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/risiko/penetapan-tujuan/list",
    name: "list-risiko-penetapan-tujuan",
    component: () => import("@/views/all/risiko/penetapan/Data.vue"),
  },
  {
    meta: {
      title: "Risiko - Penetapan Tujuan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/risiko/penetapan-tujuan/new",
    name: "new-risiko-penetapan-tujuan",
    component: () => import("@/views/all/risiko/penetapan/New.vue"),
  },

  // {
  //   meta: {
  //     title: "Capaian Lainnya",
  //     layout: "layout-authenticated",
  //     requiresAuth: true,
  //   },
  //   path: "/capaian/lainnya/list",
  //   name: "list-capaian-lainnya",
  //   component: () => import("@/views/all/capaian/Lainnya/Data.vue"),
  // },
  // {
  //   meta: {
  //     title: "Capaian Lainnya",
  //     layout: "layout-authenticated",
  //     requiresAuth: true,
  //   },
  //   path: "/capaian/lainnya/new",
  //   name: "new-capaian-lainnya",
  //   component: () => import("@/views/all/capaian/Lainnya/New.vue"),
  // },
];

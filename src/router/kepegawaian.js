export const kepegawaian = [
  // {
  //   meta: {
  //     title: "Dashboard",
  //     layout: "layout-authenticated",
  //     requiresAuth: true,
  //   },
  //   path: "/",
  //   name: "dashboard",
  //   component: () => import("@/views/kepegawaian/Dashboard.vue"),
  // },
  {
    meta: {
      title: "Data Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/list",
    name: "list-pegawai",
    component: () => import("@/views/kepegawaian/umum/DataPegawai.vue"),
  },
  {
    meta: {
      title: "Tambah Data Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/new",
    name: "new-pegawai",
    component: () => import("@/views/kepegawaian/umum/NewPegawai.vue"),
  },
  {
    meta: {
      title: "Edit Data Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/:id/edit",
    name: "edit-pegawai",
    component: () => import("@/views/kepegawaian/umum/EditDataPegawai.vue"),
  },
  {
    meta: {
      title: "Pensiun Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/pensiun/list",
    name: "list-pensiun-pegawai",
    component: () =>
      import("@/views/kepegawaian/pensiun/DataPensiunPegawai.vue"),
  },
  {
    meta: {
      title: "Pensiun Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/pensiun/new",
    name: "new-pensiun-pegawai",
    component: () =>
      import("@/views/kepegawaian/pensiun/NewPensiunPegawai.vue"),
  },
  {
    meta: {
      title: "Pengembangan Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/pengembangan/list",
    name: "list-pengembangan-pegawai",
    component: () =>
      import("@/views/kepegawaian/pengembangan/DataPengembanganPengawai.vue"),
  },
  {
    meta: {
      title: "Pengembangan Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/pengembangan/new",
    name: "new-pengembangan-pegawai",
    component: () =>
      import("@/views/kepegawaian/pengembangan/NewPengembanganPengawai.vue"),
  },
  {
    meta: {
      title: "Edit Data Pengembangan Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/pengembangan/:id/edit",
    name: "edit-pengembangan-pegawai",
    component: () =>
      import("@/views/kepegawaian/pengembangan/EditPengembanganPegawai.vue"),
  },
  {
    meta: {
      title: "Mutasi Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/mutasi/list",
    name: "list-mutasi-pegawai",
    component: () => import("@/views/kepegawaian/mutasi/DataMutasiPegawai.vue"),
  },
  {
    meta: {
      title: "Mutasi Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/mutasi/new",
    name: "new-mutasi-pegawai",
    component: () => import("@/views/kepegawaian/mutasi/NewMutasiPegawai.vue"),
  },
  {
    meta: {
      title: "Kepangkatan Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/kepangkatan/list",
    name: "list-kepangkatan-pegawai",
    component: () =>
      import("@/views/kepegawaian/kepangkatan/DataKepangkatanPegawai.vue"),
  },
  {
    meta: {
      title: "Kepangkatan Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/kepangkatan/new",
    name: "new-kepangkatan-pegawai",
    component: () =>
      import("@/views/kepegawaian/kepangkatan/NewKepangkatanPegawai.vue"),
  },
  {
    meta: {
      title: "Kenaikan Gaji Berkala Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/kgb/list",
    name: "list-kgb-pegawai",
    component: () => import("@/views/kepegawaian/kgb/DataKGBPegawai.vue"),
  },
  {
    meta: {
      title: "Kenaikan Gaji Berkala Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/kgb/new",
    name: "new-kgb-pegawai",
    component: () => import("@/views/kepegawaian/kgb/NewKGBPegawai.vue"),
  },
];

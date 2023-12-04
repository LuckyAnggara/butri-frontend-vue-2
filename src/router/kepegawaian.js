export const kepegawaian = [
  {
    meta: {
      title: "Data Pegawai",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/pegawai/list",
    name: "list-pegawai",
    component: () => import("@/views/kepegawaian/umum/DataPegawai.vue"),
  },
  {
    meta: {
      title: "Tambah Data Pegawai",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/pegawai/new",
    name: "new-pegawai",
    component: () => import("@/views/kepegawaian/umum/NewPegawai.vue"),
  },
  {
    meta: {
      title: "Edit Data Pegawai",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/pegawai/:id/edit",
    name: "edit-pegawai",
    component: () => import("@/views/kepegawaian/umum/EditDataPegawai.vue"),
  },
  {
    meta: {
      title: "Pensiun Pegawai",
      layout: "layout-authenticated",
      requiresAuth: true,
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
      requiresAuth: true,
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
      requiresAuth: true,
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
      requiresAuth: true,
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
      requiresAuth: true,
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
      requiresAuth: true,
    },
    path: "/pegawai/mutasi/list",
    name: "list-mutasi-pegawai",
    component: () => import("@/views/kepegawaian/mutasi/DataMutasiPegawai.vue"),
  },
  {
    meta: {
      title: "Mutasi Pegawai",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/pegawai/mutasi/new",
    name: "new-mutasi-pegawai",
    component: () => import("@/views/kepegawaian/mutasi/NewMutasiPegawai.vue"),
  },
  {
    meta: {
      title: "Kepangkatan Pegawai",
      layout: "layout-authenticated",
      requiresAuth: true,
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
      requiresAuth: true,
    },
    path: "/pegawai/kepangkatan/new",
    name: "new-kepangkatan-pegawai",
    component: () =>
      import("@/views/kepegawaian/kepangkatan/NewKepangkatanPegawai.vue"),
  },
  {
    meta: {
      title: "Data Kenaikan Jenjang Jabatan Pegawai",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/pegawai/kenaikan/jabatan/list",
    name: "list-kenaikan-jabatan",
    component: () =>
      import("@/views/kepegawaian/jenjang/DataJenjangPegawai.vue"),
  },
  {
    meta: {
      title: "Kenaikan Jenjang Jabatan Pegawai",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/pegawai/kenaikan/jabatan/new",
    name: "new-kenaikan-jabatan",
    component: () =>
      import("@/views/kepegawaian/jenjang/NewJenjangPegawai.vue"),
  },
  {
    meta: {
      title: "Kenaikan Gaji Berkala Pegawai",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/pegawai/kgb/list",
    name: "list-kgb-pegawai",
    component: () => import("@/views/kepegawaian/kgb/DataKGBPegawai.vue"),
  },
  {
    meta: {
      title: "Kenaikan Gaji Berkala Pegawai",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/pegawai/kgb/new",
    name: "new-kgb-pegawai",
    component: () => import("@/views/kepegawaian/kgb/NewKGBPegawai.vue"),
  },
  {
    meta: {
      title: "Master Data Jabatan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/admin/jabatan/list",
    name: "list-jabatan",
    component: () => import("@/views/kepegawaian/admin/jabatan/DataMaster.vue"),
  },
  {
    meta: {
      title: "Tambah Data Jabatan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/admin/jabatan/new",
    name: "new-jabatan",
    component: () => import("@/views/kepegawaian/admin/jabatan/NewModal.vue"),
  },
];

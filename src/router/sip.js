export const sip = [
  {
    meta: {
      title: "Rekap Hasil Temuan Internal",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/monitoring/internal/list",
    name: "list-monitoring-internal",
    component: () => import("@/views/sip/monitoring/internal/Data.vue"),
  },
  {
    meta: {
      title: "Rekap Hasil Temuan Eksternal",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/monitoring/eksternal/list",
    name: "list-monitoring-eksternal",
    component: () => import("@/views/sip/monitoring/eksternal/Data.vue"),
  },
  {
    meta: {
      title: "Rekap Pengaduan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/monitoring/pengaduan/list",
    name: "list-monitoring-pengaduan",
    component: () => import("@/views/sip/monitoring/pengaduan/Data.vue"),
  },
  {
    meta: {
      title: "Pengelolaan Media",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/pengelolaan/media/list",
    name: "list-pengelolaan-media",
    component: () => import("@/views/sip/pengelolaan/media/Data.vue"),
  },
  {
    meta: {
      title: "Pengelolaan Teknologi Informasi",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/pengelolaan/ti",
    name: "list-pengelolaan-ti",
    component: () => import("@/views/sip/monitoring/pengaduan/Data.vue"),
  },
];

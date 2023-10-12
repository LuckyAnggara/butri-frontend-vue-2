export const sip = [
  {
    meta: {
      title: "Monitoring Temuan Internal",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/monitoring/internal/list",
    name: "list-monitoring-list",
    component: () => import("@/views/sip/monitoring/internal/Data.vue"),
  },
];

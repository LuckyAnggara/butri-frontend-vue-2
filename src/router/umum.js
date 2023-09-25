export const umum = [
  {
    meta: {
      title: "Pengelolaan Persuratan",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/persuratan/list",
    name: "list-persuratan",
    component: () => import("@/views/Umum/Persuratan/Data.vue"),
  },
];

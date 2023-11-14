import { createRouter, createWebHashHistory } from "vue-router";
import { kepegawaian } from "./kepegawaian";
import { useAuthStore } from "@/stores/auth";
import { all } from "./all";
import { program } from "./program";
import { umum } from "./umum";
import { keuangan } from "./keuangan";
import { admin } from "./admin";
import { sip } from "./sip";
import { wilayah } from "./wilayah";
import { laporan } from "./laporan";

const routes = [
  {
    meta: {
      title: "Login",
      layout: "layout-guest",
      requiresAuth: false,
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/LoginView.vue"),
  },
  {
    meta: {
      title: "Dashboard",
      requiresAuth: true,
      layout: "layout-authenticated",
    },
    path: "/",
    name: "dashboard",
    component: () => {
      const auth = useAuthStore();
      if (auth.user.user?.unit?.id == 3)
        return import("@/views/dashboard/Dashboard.vue");
      if (auth.user.user?.unit?.id == 4)
        return import("@/views/program/Dashboard.vue");
      if (auth.user.user?.unit?.id == 5)
        return import("@/views/keuangan/dashboard/Dashboard.vue");
      if (auth.user.user?.unit?.id == 6)
        return import("@/views/kepegawaian/Dashboard.vue");
      if (auth.user.user?.unit?.id == 7)
        return import("@/views/dashboard/Dashboard.vue");
      if (auth.user.user?.unit?.id > 7)
        return import("@/views/wilayah/Dashboard.vue");
    },
  },

  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  ...kepegawaian,
  ...program,
  ...admin,
  ...umum,
  ...keuangan,
  ...sip,
  ...wilayah,
  ...all,
  ...laporan,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeResolve(async (to, _, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth == true && auth.isLoggedIn() == false) {
    return next("/login");
  } else if (to.name == "login" && auth.isLoggedIn() == true) {
    return next("/");
  } else {
    return next();
  }
});

export default router;

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     return savedPosition || { top: 0 };
//   },
// });

// export default router;

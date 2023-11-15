/* eslint-disable no-unused-vars */
import { defineStore, getActivePinia } from "pinia";
import { useAuthStore } from "./auth";

import admin from "@/router/menu/admin";
import kepegawaian from "@/router/menu/kepegawaian";
import sip from "@/router/menu/sip";
import umum from "@/router/menu/umum";
import program from "@/router/menu/program";
import keuangan from "@/router/menu/keuangan";
import wilayah from "@/router/menu/wilayah";

export const useMenuStore = defineStore("menu", {
  state: () => ({}),
  getters: {
    menu(state) {
      return JSON.parse(localStorage.getItem("menu")) ?? [];
    },
  },
  actions: {
    updateMenu(id) {
      if (id == 3) {
        localStorage.setItem("menu", JSON.stringify(umum));
      }
      if (id == 4) {
        localStorage.setItem("menu", JSON.stringify(program));
      }
      if (id == 5) {
        localStorage.setItem("menu", JSON.stringify(keuangan));
      }
      if (id == 6) {
        localStorage.setItem("menu", JSON.stringify(kepegawaian));
      }
      if (id == 7) {
        localStorage.setItem("menu", JSON.stringify(sip));
      }
      if (id > 7) {
        localStorage.setItem("menu", JSON.stringify(wilayah));
      }
      return;
    },
  },
});

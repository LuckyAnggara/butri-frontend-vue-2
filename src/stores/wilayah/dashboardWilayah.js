/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
const authStore = useAuthStore();

export const useDashboardWilayahStore = defineStore("dashboardWilayah", {
  state: () => ({
    responses: null,
    isLoading: false,
    filter: {
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      unit: authStore.user?.user?.group_id,
    },
  }),
  getters: {
    unitQuery(state) {
      if (state.filter.unit == 0) {
        return "";
      }
      return "&unit=" + authStore.unitID ?? 0;
    },
  },
  actions: {
    async getData() {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/dashboard-wilayah?tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}${this.unitQuery}`
        );
        this.responses = response.data.data;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoading = false;
      }
      return false;
    },
  },
});

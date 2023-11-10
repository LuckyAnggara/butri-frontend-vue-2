/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
const authStore = useAuthStore();

export const useDashboardKeuanganStore = defineStore("dashboardKeuangan", {
  state: () => ({
    responses: null,
    isLoading: false,
    filter: {
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
    },
  }),
  getters: {
    dataset(state) {
      return {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Ags",
          "Sep",
          "Okt",
          "Nov",
          "Des",
        ],
        datasets: state.responses ?? [],
      };
    },
  },
  actions: {
    async getData() {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/dashboard-keuangan?tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}`
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

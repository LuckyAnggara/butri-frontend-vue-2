/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
const authStore = useAuthStore();

export const useDashboardProgramStore = defineStore("dashboardProgram", {
  state: () => ({
    responses: null,
    isLoading: false,
    filter: {
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      jenisAnggaran: "kegiatan",
    },
  }),
  getters: {
    dataRealisasi(state) {
      return (
        state.responses.dataRealisasi.filter(
          (x) => x.jenis == state.filter.jenisAnggaran
        ) ?? []
      );
    },
    dataKepegawaian(state) {
      return state.responses.dataKepegawaian ?? [];
    },
    dataPengawasan(state) {
      return state.responses.dataPengawasan ?? [];
    },
    dataCapaianIku(state) {
      return state.responses.dataCapaianIku ?? [];
    },
    dataKinerjaKeuangan(state) {
      return state.responses.dataKinerjaKeuangan ?? [];
    },
    totalPagu(state) {
      const totalPagu = state.dataRealisasi.reduce(
        (acc, item) => acc + item.pagu,
        0
      );
      return totalPagu;
    },
    totalRealisasi(state) {
      const totalRealisasi = state.dataRealisasi.reduce(
        (acc, item) => acc + item.realisasi_saat_ini,
        0
      );
      return totalRealisasi;
    },
  },
  actions: {
    async getData() {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/dashboard-program?tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}`
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

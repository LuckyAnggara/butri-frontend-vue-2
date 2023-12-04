/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";

export const useDashboardKepegawaianStore = defineStore(
  "dashboardKepegawaian",
  {
    state: () => ({
      responses: null,
      isLoading: false,
      filter: {
        unit: 0,
      },
    }),
    getters: {
      dataUmum(state) {
        return state.responses.data ?? [];
      },
      dataPangkat(state) {
        return state.responses.pangkat.filter((x) => x.jumlah != 0) ?? [];
      },
      dataJabatan(state) {
        return state.responses.jabatan.filter((x) => x.jumlah != 0) ?? [];
      },
      unitQueryAdmin(state) {
        if (state.filter.unit == 0) {
          return "";
        }
        return "&unit=" + state.filter.unit;
      },
    },
    actions: {
      async getData() {
        this.isLoading = true;
        try {
          const response = await axiosIns.get(
            `/dashboard-kepegawaian?${this.unitQueryAdmin}`
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
  }
);

/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";

export const useSatuanKerjaStore = defineStore("satuanKerja", {
  state: () => ({
    responses: null,
    isLoading: false,
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? [];
    },
    eselon_1(state) {
      return state.items.filter((x) => x.tingkat == "ESELON I");
    },
    eselon_2(state) {
      return state.items.filter((x) => x.tingkat == "ESELON II");
    },
  },
  actions: {
    async getData() {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/satuan-kerja`);

        this.responses = response.data;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoading = false;
      }
      return false;
    },
  },
});

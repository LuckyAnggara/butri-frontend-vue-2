/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";

export const useSatuanKerjaStore = defineStore("satuanKerja", {
  state: () => ({
    responses: null,
    isLoading: false,
    searchName: "",
    currentLimit: 5,
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
    searchQuery(state) {
      if (state.searchName == "" || state.searchName == null) {
        return "";
      }
      return "&name=" + state.searchName;
    },
  },
  actions: {
    async getData() {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/satuan-kerja?limit=${this.currentLimit}${this.searchQuery}`
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

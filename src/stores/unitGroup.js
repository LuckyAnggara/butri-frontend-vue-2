/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";
import { useArrayDifference } from "@vueuse/core";
import { useMonitoringInternalStore } from "./sip/monitoringInternal";

export const useUnitGroupStore = defineStore("unitGroup", {
  state: () => ({
    responses: null,
    isLoading: false,
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? [];
    },
    teknis(state) {
      return state.items.filter((x) => x.type == "teknis");
    },
  },
  actions: {
    async getData() {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/unit-group`);

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

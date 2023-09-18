/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";

export const useDashboardKepegawaianStore = defineStore(
  "dashboardKepegawaian",
  {
    state: () => ({
      responses: null,
      isLoading: false,
    }),
    actions: {
      async getData() {
        this.isLoading = true;
        try {
          const response = await axiosIns.get(`/dashboard-kepegawaian`);

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

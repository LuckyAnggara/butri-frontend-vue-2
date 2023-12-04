/* eslint-disable no-unused-vars */
import { defineStore, getActivePinia } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const useMonitoringEksternalStore = defineStore("monitoringEksternal", {
  state: () => ({
    responsesBPK: null,
    responsesBPKP: null,
    responsesORI: null,
    originalBPK: null,
    originalBPKP: null,
    originalORI: null,
    isBPKLoading: false,
    isBPKPLoading: false,
    isORILoading: false,
    isStoreBPKLoading: false,
    isStoreBPKPLoading: false,
    isStoreORILoading: false,
    filter: {
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
    },
  }),
  getters: {
    itemsBPK(state) {
      return state.responsesBPK ?? [];
    },
    itemsBPKP(state) {
      return state.responsesBPKP ?? [];
    },
    itemsORI(state) {
      return state.responsesORI ?? [];
    },
  },
  actions: {
    async getDataBPK(page = "") {
      this.isBPKLoading = true;
      try {
        const response = await axiosIns.get(
          `/monitoring-temuan-bpk?tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}`
        );
        this.responsesBPK = response.data?.data;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isBPKLoading = false;
      }
      return false;
    },
    async getDataBPKP(page = "") {
      this.isBPKPLoading = true;
      try {
        const response = await axiosIns.get(
          `/monitoring-temuan-bpkp?tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}`
        );
        this.responsesBPKP = response.data?.data;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isBPKPLoading = false;
      }
      return false;
    },
    async getDataORI(page = "") {
      this.isORILoading = true;
      try {
        const response = await axiosIns.get(
          `/monitoring-temuan-ori?tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}`
        );
        this.responsesORI = response.data?.data;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isORILoading = false;
      }
      return false;
    },
    async storeBPK() {
      this.isStoreBPKLoading = true;
      try {
        const response = await axiosIns.post(`/monitoring-temuan-bpk`, {
          tahun: this.filter.currentYear,
          bulan: this.filter.currentMonth,
          detail: this.itemsBPK,
          created_by: authStore.user.user.id,
        });
        if (response.status == 200) {
          toast.success("Data berhasil dibuat", {
            timeout: 3000,
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.info(error);
        toast.error(error.response.data.data, {
          timeout: 3000,
        });
      } finally {
        this.isStoreBPKLoading = false;
      }
    },
    async storeBPKP() {
      this.isStoreBPKPLoading = true;
      try {
        const response = await axiosIns.post(`/monitoring-temuan-bpkp`, {
          tahun: this.filter.currentYear,
          bulan: this.filter.currentMonth,
          detail: this.itemsBPKP,
          created_by: authStore.user.user.id,
        });
        if (response.status == 200) {
          toast.success("Data berhasil dibuat", {
            timeout: 3000,
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.info(error);
        toast.error(error.response.data.data, {
          timeout: 3000,
        });
      } finally {
        this.isStoreBPKPLoading = false;
      }
    },
    async storeORI() {
      this.isStoreORILoading = true;
      try {
        const response = await axiosIns.post(`/monitoring-temuan-ori`, {
          tahun: this.filter.currentYear,
          bulan: this.filter.currentMonth,
          detail: this.itemsORI,
          created_by: authStore.user.user.id,
        });
        if (response.status == 200) {
          toast.success("Data berhasil dibuat", {
            timeout: 3000,
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.info(error);
        toast.error(error.response.data.data, {
          timeout: 3000,
        });
      } finally {
        this.isStoreORILoading = false;
      }
    },
    readyEditBPK() {
      this.originalBPK = JSON.parse(JSON.stringify(this.itemsBPK));
    },
    readyEditBPKP() {
      this.originalBPKP = JSON.parse(JSON.stringify(this.itemsBPKP));
    },
    readyEditORI() {
      this.originalORI = JSON.parse(JSON.stringify(this.itemsORI));
    },
    cancelEditBPK() {
      this.responsesBPK = JSON.parse(JSON.stringify(this.originalBPK));
    },
    cancelEditBPKP() {
      this.responsesBPKP = JSON.parse(JSON.stringify(this.originalBPKP));
    },
    cancelEditORI() {
      this.responsesORI = JSON.parse(JSON.stringify(this.originalORI));
    },
    isMonitoringExist(item) {
      const d = this.items.filter((x) => x.id == item.id);
      if (d) {
        this.wilayahExist = true;
      }
      this.wilayahExist = false;
    },
  },
});

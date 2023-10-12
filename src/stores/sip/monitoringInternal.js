/* eslint-disable no-unused-vars */
import { defineStore, getActivePinia } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const useMonitoringInternalStore = defineStore("monitoringInternal", {
  state: () => ({
    responses: null,
    singleResponses: null,
    originalSingleResponses: null,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    userData: null,
    form: {
      tahun: "",
      bulan: "",
      group_id: 0,
      temuan_nominal: "",
      temuan_jumlah: "",
      tl_nominal: "",
      tl_jumlah: "",
      btl_nominal: "",
      btl_jumlah: "",
      created_by: authStore.user.user.id,
    },
    filter: {
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
    },
    currentLimit: 5,
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? [];
    },
  },
  actions: {
    async getData(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/monitoring-temuan-internal?tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}`
        );
        this.responses = response.data;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoading = false;
      }
      return false;
    },
    async store() {
      this.isStoreLoading = true;
      try {
        const response = await axiosIns.post(`/mutasi`, this.form);
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
        this.isStoreLoading = false;
      }
    },
    async destroy(id) {
      this.isDestroyLoading = true;
      setTimeout(() => {}, 500);
      try {
        await axiosIns.delete(`/mutasi/${id}`);
        toast.success("Data berhasil di hapus", {
          timeout: 2000,
        });
        const index = this.items.findIndex((item) => item.id === id);
        this.responses.data.splice(index, 1);
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        });
      } finally {
        this.isDestroyLoading = false;
      }
    },
    async update() {
      this.isUpdateLoading = true;
      try {
        const response = await axiosIns.put(
          `/mutasi/${this.singleResponses.id}`,
          this.singleResponses
        );
        if (response.status == 200) {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          this.originalSingleResponses = JSON.parse(
            JSON.stringify(response.data.data)
          );
          return true;
        } else {
          return false;
        }
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        });
      } finally {
        this.isUpdateLoading = false;
      }
    },
    addFormDataEdit(payload) {
      const b = this.singleResponses.list.filter((x) => x.id == payload.id);
      if (b.length > 0) {
        toast.info(`Data sudah ada`, {
          timeout: 1200,
        });
      } else {
        this.singleResponses.list.push(payload);
      }
    },
    addFormData(payload) {
      const b = this.form.list.filter((x) => x.id == payload.id);
      if (b.length > 0) {
        toast.info(`Data sudah ada`, {
          timeout: 1200,
        });
      } else {
        this.form.list.push(payload);
      }
    },
    editReset() {
      this.singleResponses = JSON.parse(
        JSON.stringify(this.originalSingleResponses)
      );
    },
  },
});

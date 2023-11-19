/* eslint-disable no-unused-vars */
import { defineStore, getActivePinia } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const usePegawaiStore = defineStore("pegawai", {
  state: () => ({
    responses: null,
    singleResponses: null,
    originalSingleResponses: null,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    userData: null,
    newPegawai: {
      name: "",
      nip: "",
      is_wa: false,
      gender: "",
      phone_number: "",
      email: "",
      jabatan: "",
      tmt_jabatan: "",
      pangkat: "",
      tmt_pangkat: "",
      unit: "",
      tmt_pensiun: "",
      created_by: authStore.user.user.id,
    },
    filter: {
      unit: 0,
    },
    searchName: "",
    currentLimit: 5,
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? [];
    },
    currentPage(state) {
      return state.responses?.current_page;
    },
    pageLength(state) {
      return Math.round(state.responses?.total / state.responses?.per_page);
    },
    lastPage(state) {
      return state.responses?.last_page;
    },
    from(state) {
      return state.responses?.from;
    },
    to(state) {
      return state.responses?.to;
    },
    total(state) {
      return state.responses?.total;
    },
    searchQuery(state) {
      if (state.searchName == "" || state.searchName == null) {
        return "";
      }
      return "&name=" + state.searchName;
    },
    unitQueryAdmin(state) {
      if (state.filter.unit == 0) {
        return "";
      }
      return "&unit=" + state.filter.unit;
    },
  },
  actions: {
    async getData(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/employee?limit=${this.currentLimit}${this.searchQuery}${page}${this.unitQueryAdmin}`
        );

        this.responses = response.data.data;
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
        const response = await axiosIns.post(`/employee`, this.newPegawai);
        if (response.status == 200) {
          toast.success(response.message, {
            timeout: 3000,
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        toast.error(error.response.data.data, {
          timeout: 3000,
        });
      } finally {
        this.isStoreLoading = false;
      }
    },
    async showData(id = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/employee/${id}`);
        this.singleResponses = JSON.parse(JSON.stringify(response.data.data));
        this.originalSingleResponses = JSON.parse(
          JSON.stringify(response.data.data)
        );
      } catch (error) {
        toast.error("Data not found", {
          position: "bottom-right",
        });
      }
      this.isLoading = false;
    },
    async destroy(id) {
      this.isDestroyLoading = true;
      setTimeout(() => {}, 1000);
      try {
        await axiosIns.delete(`/employee/${id}`);
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
          `/employee/${this.singleResponses.id}`,
          this.singleResponses
        );
        if (response.status == 200) {
          toast.success(response.data.message, {
            timeout: 3000,
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        toast.error(error.message, {
          timeout: 3000,
        });
      } finally {
        this.isUpdateLoading = false;
      }
    },

    editReset() {
      this.singleResponses = JSON.parse(
        JSON.stringify(this.originalSingleResponses)
      );
    },
  },
});

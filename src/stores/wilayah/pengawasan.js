/* eslint-disable no-unused-vars */
import { defineStore, getActivePinia } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const usePengawasanStore = defineStore("pengawasan", {
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
    wilayahExist: false,
    form: {
      tahun: new Date().getFullYear(),
      bulan: new Date().getMonth() + 1,
      name: null,
      sp_number: null,
      sp_date: "",
      jenis_pengawasan_id: null,
      location: null,
      output: null,
      tanggalKegiatan: {
        startDate: "",
        endDate: "",
      },
      created_by: authStore.user.user.id,
      unit_id: authStore.user.user.unit_id,
    },
    filter: {
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      unit: authStore.user.user.unit_id,
      searchQuery: "",
    },
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
    exist(state) {
      const d = state.items.find((x) => x.group_id == state.form.group_id);
      if (d) {
        return true;
      }
      return false;
    },
    searchQuery(state) {
      if (state.filter.searchQuery == "" || state.filter.searchQuery == null) {
        return "";
      }
      return "&query=" + state.filter.searchQuery;
    },
    unitQuery(state) {
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
          `/data-pengawasan?limit=${this.currentLimit}&tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}${this.unitQuery}${this.searchQuery}${page}`
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
        const response = await axiosIns.post(`/data-pengawasan`, this.form);
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
        await axiosIns.delete(`/data-pengawasan/${id}`);
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
          `/data-pengawasan/${this.singleResponses.id}`,
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
    readyEdit(item) {
      this.singleResponses = JSON.parse(JSON.stringify(item));
      this.originalSingleResponses = JSON.parse(JSON.stringify(item));
    },
    clearForm() {
      this.form = {
        tahun: new Date().getFullYear(),
        bulan: new Date().getMonth() + 1,
        name: null,
        sp_number: null,
        sp_date: "",
        jenis_pengawasan_id: null,
        location: null,
        tanggalKegiatan: {
          startDate: "",
          endDate: "",
        },
        created_by: authStore.user.user.id,
        unit_id: authStore.user.user.unit_id,
      };
    },
  },
});

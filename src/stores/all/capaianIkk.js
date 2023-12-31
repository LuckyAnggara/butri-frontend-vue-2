/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const useCapaianIkk = defineStore("capaianIkk", {
  state: () => ({
    responses: null,
    singleResponses: null,
    capaianResponses: null,
    originalCapaianResponses: null,
    originalSingleResponses: null,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    form: {
      tahun: new Date().getFullYear(),
      bulan: new Date().getMonth() + 1,
      ikk: {
        target: null,
      },
      realisasi: null,
      capaian: null,
      analisa: null,
      kegiatan: null,
      kendala: null,
      hambatan: "",
      group_id: authStore.user.user.unit.group_id,
      created_by: authStore.user.user.id,
    },
    filter: {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      searchQuery: "",
      unit: 0,
    },
  }),
  getters: {
    unit(state) {
      return authStore.groupID;
    },
    items(state) {
      return state.responses?.data ?? [];
    },
    monitoringCapaian(state) {
      return state.singleResponses?.capaian.filter(
        (x) => x.bulan == filter.currentMonth
      );
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
      if (state.filter.searchQuery == "" || state.filter.searchQuery == null) {
        return "";
      }
      return "&query=" + state.filter.searchQuery;
    },
    unitQuery(state) {
      if (state.unit == 0) {
        return "";
      }
      return "&unit=" + state.unit;
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
          `/capaian-ikk?tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}${this.searchQuery}${page}${this.unitQuery}`
        );
        this.responses = response.data;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoading = false;
      }
      return false;
    },
    async getDataAdmin(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/capaian-ikk?tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}${this.searchQuery}${page}${this.unitQueryAdmin}`
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
        const response = await axiosIns.post(`/capaian-ikk`, this.form);
        if (response.status == 200) {
          toast.success("Data berhasil dibuat", {
            timeout: 3000,
          });
          this.clearForm();
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.info("aa");
        toast.error(error.response?.data, {
          timeout: 3000,
        });
      } finally {
        this.isStoreLoading = false;
      }
    },
    async showData(id = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/capaian-ikk/${id}`);
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
    async showCapaian(id = "", isCapaian = false) {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/capaian-ikk/capaian/${id}`);
        this.capaianResponses = JSON.parse(JSON.stringify(response.data.data));
        this.originalCapaianResponses = JSON.parse(
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
      setTimeout(() => {}, 500);
      try {
        await axiosIns.delete(`/capaian-ikk/${id}`);
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
          `/capaian-ikk/${this.singleResponses.id}`,
          this.singleResponses
        );
        if (response.status == 200) {
          toast.success(response.data.message, {
            timeout: 2000,
          });
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
    async updateCapaian() {
      this.isUpdateLoading = true;
      try {
        const response = await axiosIns.put(
          `/capaian-ikk/${this.capaianResponses.id}`,
          this.capaianResponses
        );
        if (response.status == 200) {
          toast.success(response.data.message, {
            timeout: 2000,
          });
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
    clearForm() {
      this.form = {
        tahun: new Date().getFullYear(),
        bulan: new Date().getMonth() + 1,
        ikk: {
          target: null,
        },
        realisasi: null,
        analisa: null,
        kegiatan: null,
        kendala: null,
        hambatan: "",
        group_id: authStore.user.user.unit.group_id,
        created_by: authStore.user.user.id,
      };
    },
  },
});

/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const usePersuratanStore = defineStore("persuratan", {
  state: () => ({
    responses: null,
    singleResponses: null,
    originalSingleResponses: null,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    form: {
      tahun: new Date().getFullYear(),
      bulan: new Date().getMonth() + 1,
      surat_masuk: "",
      surat_keluar: "",
      // group_id: authStore.user.user.unit.group_id,
      created_by: authStore.user.user.id,
    },
    filter: {
      currentYear: new Date().getFullYear(),
      searchQuery: "",
      group: 0,
      currentMonth: new Date().getMonth() + 1,
    },
  }),
  getters: {
    items(state) {
      return state.responses ?? [];
    },
    totalSuratMasuk(state) {
      const totalMasuk = state.items.reduce(
        (acc, item) => acc + item.surat_masuk,
        0
      );
      return totalMasuk;
    },
    totalSuratKeluar(state) {
      const totalKeluar = state.items.reduce(
        (acc, item) => acc + item.surat_keluar,
        0
      );
      return totalKeluar;
    },
    unitQuery(state) {
      if (state.filter.group == 0) {
        return "";
      }
      return "&unit=" + state.filter.group;
    },
    monthQuery(state) {
      if (state.filter.currentMonth == 0) {
        return "";
      }
      return "&bulan=" + state.filter.currentMonth;
    },
  },
  actions: {
    async getData(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/pengelolaan-persuratan?tahun=${this.filter.currentYear}${this.unitQuery}${this.monthQuery}`
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
        const response = await axiosIns.post(
          `/pengelolaan-persuratan`,
          this.form
        );

        if (response.status == 200) {
          toast.success("Data berhasil dibuat", {
            timeout: 3000,
          });
          this.clearForm();
          return true;
        } else if (response.status == 202) {
          toast.error(
            `Data bulan ${this.form.bulan} tahun ${this.form.tahun} sudah ada`,
            {
              timeout: 3000,
            }
          );
          return false;
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
        await axiosIns.delete(`/pengelolaan-persuratan/${id}`);
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
        const response = await axiosIns.post(`/pengelolaan-persuratan`, {
          ...this.singleResponses,
        });
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
        bulan: new Date().getMonth() + 1,
        tahun: new Date().getFullYear(),
        name: "",
        target: "",
        created_by: authStore.user.user.id,
      };
    },
    readyEdit(item) {
      this.singleResponses = JSON.parse(JSON.stringify(item));
      this.originalSingleResponses = JSON.parse(JSON.stringify(item));
    },
  },
});

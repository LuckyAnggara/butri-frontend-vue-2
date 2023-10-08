/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const useKinerjaKeuanganStore = defineStore("kinerjaKeunagan", {
  state: () => ({
    responses: null,
    singleResponses: null,
    originalSingleResponses: null,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    created_by: authStore.user.user.id,
    form: {
      bulan: new Date().getMonth() + 1,
      tahun: new Date().getFullYear(),
      capaian_sasaran_program: 0,
      capaian_output_program: 0,
      efisiensi: 0,
      konsistensi: 0,
      nilai_efisiensi: 0,
      penyerapan: 0,
      rata_nka_satker: 0,
      created_by: authStore.user.user.id,
    },
    filter: {
      searchQuery: "",
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
    },
  }),
  getters: {
    items(state) {
      return state.responses ?? [];
    },
    searchQuery(state) {
      if (state.filter.searchQuery == "" || state.filter.searchQuery == null) {
        return "";
      }
      return "&query=" + state.filter.searchQuery;
    },
  },
  actions: {
    async getData(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/kinerja-keuangan?tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}${this.searchQuery}`
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
        const response = await axiosIns.post(`/kinerja-keuangan`, this.form);

        if (response.status == 200) {
          toast.success("Data berhasil disimpan", {
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
        await axiosIns.delete(`/kinerja-keuangan/${id}`);
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
          `/kinerja-keuangan/${this.singleResponses.id}`,
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
    clearForm() {
      this.form = {
        bulan: new Date().getMonth() + 1,
        tahun: new Date().getFullYear(),
        capaian_sasaran_program: 0,
        capaian_output_program: 0,
        efisiensi: 0,
        konsistensi: 0,
        nilai_efisiensi: 0,
        penyerapan: 0,
        rata_nka_satker: 0,
        created_by: authStore.user.user.id,
      };
    },
    readyEdit(item) {
      this.singleResponses = JSON.parse(JSON.stringify(item));
      this.originalSingleResponses = JSON.parse(JSON.stringify(item));
    },
  },
});

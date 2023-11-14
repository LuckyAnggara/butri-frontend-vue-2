/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const useRealisasiAnggaranStore = defineStore("realisasiAnggaran", {
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
    perKegiatan(state) {
      return state.items.filter((x) => x.jenis == "kegiatan");
    },
    perBelanja(state) {
      return state.items.filter((x) => x.jenis == "belanja");
    },
    totalPaguKegiatan(state) {
      const totalPagu = state.perKegiatan.reduce(
        (acc, item) => acc + item.pagu,
        0
      );
      return totalPagu;
    },
    totalPaguBelanja(state) {
      const totalPagu = state.perBelanja.reduce(
        (acc, item) => acc + item.pagu,
        0
      );
      return totalPagu;
    },
    totalRealisasiKegiatan(state) {
      const totalRealisasi = state.perKegiatan.reduce(
        (acc, item) => acc + item.total_realisasi,
        0
      );
      return totalRealisasi;
    },
    totalRealisasiSaatIniKegiatan(state) {
      const totalRealisasi = state.perKegiatan.reduce(
        (acc, item) => acc + item.realisasi_saat_ini,
        0
      );
      return totalRealisasi;
    },
    totalDPSaatIniKegiatan(state) {
      const totalRealisasi = state.perKegiatan.reduce(
        (acc, item) => acc + item.dp_saat_ini,
        0
      );
      return totalRealisasi;
    },
    totalRealisasiBelanja(state) {
      const totalRealisasi = state.perBelanja.reduce(
        (acc, item) => acc + item.total_realisasi,
        0
      );
      return totalRealisasi;
    },
    totalRealisasiSaatIniBelanja(state) {
      const totalRealisasi = state.perBelanja.reduce(
        (acc, item) => acc + item.realisasi_saat_ini,
        0
      );
      return totalRealisasi;
    },
    totalDPSaatIniBelanja(state) {
      const totalRealisasi = state.perBelanja.reduce(
        (acc, item) => acc + item.dp_saat_ini,
        0
      );
      return totalRealisasi;
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
          `/realisasi-anggaran?tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}${this.searchQuery}`
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
        const response = await axiosIns.post(`/realisasi-anggaran`, {
          head: this.filter,
          detail: this.items,
          created_by: this.created_by,
        });

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
        await axiosIns.delete(`/realisasi-anggaran/${id}`);
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
          `/realisasi-anggaran/${this.singleResponses.id}`,
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

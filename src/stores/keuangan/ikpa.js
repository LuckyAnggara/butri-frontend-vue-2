/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const useIkpaStore = defineStore("ikpa", {
  state: () => ({
    responses: null,
    originalResponses: null,
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
      return state.responses ?? {};
    },
    nilaiAspek_2(state) {
      return (
        (state.items.penyerapan_anggaran +
          state.items.belanja_kontraktual +
          state.items.penyelesaian_tagihan +
          state.items.pengelolaan_up_tup +
          state.items.dispensasi_spm) /
        5
      );
    },
    nilaiTotal(state) {
      return (
        (10 / 100) * state.items.revisi_dipa +
        (10 / 100) * state.items.halaman_tiga_dipa +
        (20 / 100) * state.items.penyerapan_anggaran +
        (10 / 100) * state.items.belanja_kontraktual +
        (10 / 100) * state.items.penyelesaian_tagihan +
        (10 / 100) * state.items.pengelolaan_up_tup +
        (5 / 100) * state.items.dispensasi_spm +
        (25 / 100) * state.items.capaian_output
      );
    },
  },
  actions: {
    async getData(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/ikpa?tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}`
        );
        this.responses = response.data.data;
        if (this.responses == null) {
          this.responses = {
            id: 1,
            tahun: this.filter.currentYear,
            bulan: this.filter.currentMonth,
            revisi_dipa: 0,
            halaman_tiga_dipa: 0,
            penyerapan_anggaran: 0,
            belanja_kontraktual: 0,
            penyelesaian_tagihan: 0,
            pengelolaan_up_tup: 0,
            dispensasi_spm: 0,
            capaian_output: 0,
            created_by: authStore.user.user.id,
          };
        }
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
        const response = await axiosIns.post(`/ikpa`, this.items);
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
        await axiosIns.delete(`/ikpa/${id}`);
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
          `/ikpa/${this.singleResponses.id}`,
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
    readyEdit() {
      this.originalResponses = JSON.parse(JSON.stringify(this.responses));
    },
    cancelEdit() {
      this.responses = JSON.parse(JSON.stringify(this.originalResponses));
    },
  },
});

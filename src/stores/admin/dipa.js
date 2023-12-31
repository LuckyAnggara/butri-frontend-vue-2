/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const useDipaStore = defineStore("dipa", {
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
      jenis: "kegiatan",
      kode: null,
      name: null,
      pagu: null,
      group_id: null,
      tahun: new Date().getFullYear(),
      created_by: authStore.user.user.id,
    },
    filter: {
      unit: 0,
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
          `/dipa?tahun=${this.filter.currentYear}${this.unitQuery}`
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
        const response = await axiosIns.post(`/dipa`, this.form);

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
        await axiosIns.delete(`/dipa/${id}`);
        toast.success("Data berhasil di hapus", {
          timeout: 2000,
        });
        const index = this.items.findIndex((item) => item.id === id);
        this.responses.splice(index, 1);
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
          `/dipa/${this.singleResponses.id}`,
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
        kode: null,
        name: null,
        pagu: null,
        group_id: null,
        tahun: new Date().getFullYear(),
        created_by: authStore.user.user.id,
      };
    },
    readyEdit(item) {
      this.singleResponses = JSON.parse(JSON.stringify(item));
      this.originalSingleResponses = JSON.parse(JSON.stringify(item));
    },
  },
});

/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
import moment from "moment";

const toast = useToast();
const authStore = useAuthStore();
export const useCapaianProgramUnggulan = defineStore("capaianProgramUnggulan", {
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
      program_unggulan_id: 0,
      waktu: {
        startDate: null,
        endDate: null,
      },
      output: "",
      notes: "",
      unit_id: authStore.user.user.unit_id,
      created_by: authStore.user.user.id,
    },
    filter: {
      date: [
        moment().startOf("year").format("DD MMMM YYYY"),
        moment().endOf("year").format("DD MMMM YYYY"),
      ],
      searchQuery: "",
      unit: authStore.user.user.unit_id,
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
    dateQuery(state) {
      if (state.filter.date.length == 0 || state.filter.date.length == null) {
        return "";
      }
      return (
        "&start-date=" +
        state.filter.date[0] +
        "&end-date=" +
        state.filter.date[1]
      );
    },
    searchQuery(state) {
      if (state.filter.searchQuery == "" || state.filter.searchQuery == null) {
        return "";
      }
      return "&query=" + state.filter.searchQuery;
    },
    waktu(state) {
      return state.form.waktu.startDate + " s/d " + state.form.waktu.endDate;
    },
  },
  actions: {
    async getData(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/capaian-program-unggulan?limit=${this.currentLimit}&unit=${this.filter.unit}${this.searchQuery}${page}${this.dateQuery}`
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
          `/capaian-program-unggulan`,
          this.form
        );
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
        await axiosIns.delete(`/capaian-program-unggulan/${id}`);
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
          `/kegiatan/${this.singleResponses.id}`,
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
    addFromKegiatan(payload) {
      this.form.id = payload.id;
      this.form.name = payload.name;
      this.form.jenis_kegiatan = payload.jenis_kegiatan;
      this.form.tempat = payload.tempat;
      this.form.waktu = payload.waktu;
      this.form.notes = payload.notes;
      this.form.output = payload.output;
    },
    resetFromKegiatan() {
      this.form = {
        name: null,
        jenis_kegiatan: null,
        tempat: null,
        waktu: {
          startDate: null,
          endDate: null,
        },
        output: "",
        notes: "",
        unit_id: authStore.user.user.unit_id,
        created_by: authStore.user.user.id,
      };
    },
  },
});

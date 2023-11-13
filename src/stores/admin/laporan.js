/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const useLaporanStore = defineStore("laporan", {
  state: () => ({
    responses: null,
    singleResponses: null,
    originalSingleResponses: null,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    isDownloading: false,
    downloadId: 0,
    destroyId: 0,
    form: {
      ttd_name: "",
      ttd_nip: "",
      ttd_location: "",
      parameter: {
        tahun: new Date().getFullYear(),
        bulan: new Date().getMonth() + 1,
        group: authStore.user.user.unit.group_id,
      },
      created_by: authStore.user.user.id,
    },
    filter: {
      date: new Date().getFullYear(),
      searchQuery: "",
    },
    currentYear: new Date().getFullYear(),
  }),
  getters: {
    items(state) {
      return state.responses ?? [];
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
  },
  actions: {
    async getData() {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/laporan?tahun=${this.currentYear}${this.searchQuery}`
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
        const response = await axiosIns.post(`/laporan`, this.form);
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
      this.destroyId = id;
      setTimeout(() => {}, 500);
      try {
        await axiosIns.delete(`/laporan/${id}`);
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
          `/laporan/${this.singleResponses.id}`,
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
    async download(label, id) {
      this.downloadId = id;
      this.isDownloading = true;
      try {
        const response = await axiosIns
          .get(`/laporan-download/${id}`, {
            responseType: "arraybuffer",
          })
          .then((response) => {
            console.log(response);

            let blob = new Blob([response.data], {
              type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });

            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = label;
            link.click();
            //   url = window.URL.createObjectURL(blob);

            // window.open(url); // Mostly the same, I was just experimenting with different approaches, tried link.click, iframe and other solutions
          });
      } catch (error) {
        alert(error.message);
      } finally {
        this.downloadId = 0;
        this.isDownloading = false;
      }
    },
    clearForm() {
      this.form = {
        ttd_name: "",
        ttd_nip: "",
        ttd_location: "",
        parameter: {
          tahun: new Date().getFullYear(),
          bulan: new Date().getMonth() + 1,
          group: authStore.user.user.unit.group_id,
        },
        created_by: authStore.user.user.id,
      };
    },
    readyEdit(item) {
      this.singleResponses = JSON.parse(JSON.stringify(item));
      this.originalSingleResponses = JSON.parse(JSON.stringify(item));
    },
  },
});

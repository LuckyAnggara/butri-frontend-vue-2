/* eslint-disable no-unused-vars */
import { defineStore, getActivePinia } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const useMonitoringPengaduanStore = defineStore("monitoringPengaduan", {
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
      eselon: null,
      satker_id: 0,
      wbs: 0,
      aplikasi_lapor: 0,
      website: 0,
      sms_gateway: 0,
      media_sosial: 0,
      surat_pos: 0,
      kotak_pengaduan: 0,
      created_by: authStore.user.user.id,
    },
    filter: {
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      currentEselon: 0,
    },
    currentLimit: 5,
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? [];
    },
    exist(state) {
      const d = state.items.find((x) => x.group_id == state.form.group_id);
      if (d) {
        return true;
      }
      return false;
    },
    eselonQuery(state) {
      if (state.filter.currentEselon == 0) {
        return "";
      }
      return "&eselon=" + state.filter.currentEselon;
    },
  },
  actions: {
    async getData(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/monitoring-pengaduan?tahun=${this.filter.currentYear}&bulan=${this.filter.currentMonth}${this.eselonQuery}`
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
        const response = await axiosIns.post(
          `/monitoring-pengaduan`,
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
        await axiosIns.delete(`/monitoring-pengaduan/${id}`);
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
          `/monitoring-pengaduan/${this.singleResponses.id}`,
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
    isMonitoringExist(item) {
      const d = this.items.filter((x) => x.id == item.id);
      if (d) {
        this.wilayahExist = true;
      }
      this.wilayahExist = false;
    },
    clearForm() {
      this.form = {
        tahun: new Date().getFullYear(),
        bulan: new Date().getMonth() + 1,
        group_id: 0,
        temuan_nominal: "",
        temuan_jumlah: "",
        tl_nominal: "",
        tl_jumlah: "",
        btl_nominal: "",
        btl_jumlah: "",
        created_by: authStore.user.user.id,
      };
    },
  },
});

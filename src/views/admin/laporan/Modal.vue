<template>
  <div
    v-if="show"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
  >
    <!-- Modal content -->
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div
        class="relative p-4 bg-white dark:bg-slate-900 rounded-lg shadow sm:p-5"
      >
        <div
          class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Generate Laporan / Output
          </h3>
          <button
            @click="closeModal"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <form @submit.prevent="prosesRequest()">
          <h4 class="font-bold mb-2">Data</h4>
          <div class="flex space-x-4">
            <FormField label="Tahun" class="w-full">
              <select
                :disabled="laporanStore.isStoreLoading"
                required
                v-model="laporanStore.form.parameter.tahun"
                class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              >
                <option
                  v-for="option in mainStore.tahunOptions"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </FormField>
            <FormField label="Bulan" class="w-full">
              <select
                required
                :disabled="laporanStore.isStoreLoading"
                v-model="laporanStore.form.parameter.bulan"
                class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              >
                <option
                  v-for="option in mainStore.bulanOptions"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.label }}
                </option>
              </select>
            </FormField>
          </div>
          <hr />
          <h4 class="font-bold my-2">Data Tanda Tangan</h4>

          <div class="relative mb-6">
            <label class="block font-bold mb-2">Cari Pegawai</label>
            <Select2
              :use-SSR="true"
              @ssr="find"
              :is-loading="pegawaiStore.isLoading"
              :use-loader="true"
              :data="pegawaiStore.items"
              v-model="search"
              placeholder="Cari data pegawai .."
              @chosen="handleChosen"
            ></Select2>
            <small>Cari dari data Pegawai / Input Manual</small>
          </div>

          <FormField label="Nama">
            <FormControl
              v-model="laporanStore.form.ttd_name"
              :disabled="laporanStore.isStoreLoading"
              required
            />
          </FormField>
          <div class="flex space-x-4">
            <FormField class="w-full" label="Jabatan">
              <FormControl
                v-model="laporanStore.form.ttd_jabatan"
                :disabled="laporanStore.isStoreLoading"
                required
              />
            </FormField>

            <FormField class="w-full" label="NIP">
              <FormControl
                v-model="laporanStore.form.ttd_nip"
                :disabled="laporanStore.isStoreLoading"
                required
              />
            </FormField>
          </div>
          <div class="flex space-x-4">
            <FormField label="Tempat" class="w-full">
              <FormControl
                v-model="laporanStore.form.ttd_location"
                :disabled="laporanStore.isStoreLoading"
                required
              />
            </FormField>

            <FormField label="Tanggal" class="w-full">
              <vue-tailwind-datepicker
                :disabled="laporanStore.isStoreLoading"
                :shortcuts="false"
                as-single
                required
                placeholder="Tanggal Surat Perintah"
                v-model="laporanStore.form.ttd_tanggal"
                :formatter="formatter"
                input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              />
            </FormField>
          </div>
          <BaseDivider />

          <div class="flex justify-start space-x-3 items-center">
            <BaseButton
              :disabled="laporanStore.isStoreLoading"
              type="submit"
              color="info"
              ><span v-if="!laporanStore.isStoreLoading">Submit</span
              ><span class="flex flex-row items-center" v-else>
                <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
                Processing</span
              ></BaseButton
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useLaporanStore } from "@/stores/admin/laporan";
import { useMainStore } from "@/stores/main";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import Select2 from "@/components/Select2.vue";
import { usePegawaiStore } from "@/stores/pegawai/pegawai";
import { useDebounceFn } from "@vueuse/core";

const props = defineProps({
  show: Boolean,
  updateData: Boolean,
});

const formatter = ref({
  date: "DD MMMM YYYY",
});

const search = ref("");

const find = useDebounceFn((x) => {
  pegawaiStore.searchName = search.value;
  pegawaiStore.getData();
}, 500);

function handleChosen(payload) {
  laporanStore.addFromExisting(payload);
}

const emit = defineEmits(["close", "submitStore", "submitUpdate"]);

const laporanStore = useLaporanStore();
const mainStore = useMainStore();
const pegawaiStore = usePegawaiStore();

async function prosesRequest() {
  emit("submitStore");
}

async function prosesUpdate() {
  emit("submitUpdate");
}

function closeModal() {
  laporanStore.clearForm();
  emit("close");
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

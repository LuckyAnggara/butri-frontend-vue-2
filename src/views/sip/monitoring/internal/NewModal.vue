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
            Tambah data
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
          <div class="flex space-x-4">
            <FormField label="Tahun" class="w-full">
              <select
                :disabled="monitoringInternalStore.isStoreLoading"
                v-model="monitoringInternalStore.form.tahun"
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
                :disabled="monitoringInternalStore.isStoreLoading"
                v-model="monitoringInternalStore.form.bulan"
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

          <!-- <div class="relative mb-6">
            <label class="block font-bold mb-2">Satuan Kerja</label>
            <Select2
              :use-SSR="true"
              @ssr="find"
              :is-loading="satkerStore.isLoading"
              :use-loader="true"
              :data="satkerStore.items"
              v-model="search"
              placeholder="Cari data pegawai .."
              @chosen="handleChosen"
            ></Select2>
          </div> -->
          <FormField
            label="Wilayah"
            :help="
              monitoringInternalStore.exist
                ? 'Data wilayah ini sudah di input'
                : ''
            "
          >
            <select
              required
              :disabled="monitoringInternalStore.isStoreLoading"
              v-model="monitoringInternalStore.form.group_id"
              class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option
                v-for="option in groupStore.teknis"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>
          </FormField>
          <FormField label="Mata Uang">
            <FormControl
              type="text"
              v-model="monitoringInternalStore.form.currency"
              :disabled="monitoringInternalStore.isStoreLoading"
              placeholder="Default : IDR"
            />
          </FormField>
          <FormField label="Temuan">
            <FormControl
              type="number"
              v-model="monitoringInternalStore.form.temuan_jumlah"
              :disabled="monitoringInternalStore.isStoreLoading"
              placeholder="Jumlah"
            />
            <FormControl
              v-model="monitoringInternalStore.form.temuan_nominal"
              type="number"
              :disabled="monitoringInternalStore.isStoreLoading"
              placeholder="Nominal"
            />
          </FormField>
          <FormField label="Temuan Yang Sudah Tindak Lanjut ">
            <FormControl
              type="number"
              v-model="monitoringInternalStore.form.tl_jumlah"
              :disabled="monitoringInternalStore.isStoreLoading"
              placeholder="Jumlah"
            />
            <FormControl
              v-model="monitoringInternalStore.form.tl_nominal"
              type="number"
              :disabled="monitoringInternalStore.isStoreLoading"
              placeholder="Nominal"
            />
          </FormField>
          <FormField label="Temuan Yang Belum Tindak Lanjut">
            <input
              type="number"
              :value="
                monitoringInternalStore.form.temuan_jumlah -
                monitoringInternalStore.form.tl_jumlah
              "
              :disabled="true"
              placeholder="Jumlah"
            />
            <input
              :value="
                monitoringInternalStore.form.temuan_nominal -
                monitoringInternalStore.form.tl_nominal
              "
              type="number"
              :disabled="true"
              placeholder="Nominal"
            />
          </FormField>

          <BaseDivider />

          <div class="flex justify-start space-x-3 items-center">
            <BaseButton
              :disabled="monitoringInternalStore.isStoreLoading"
              type="submit"
              color="info"
              ><span v-if="!monitoringInternalStore.isStoreLoading">Submit</span
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
import { useMonitoringInternalStore } from "@/stores/sip/monitoringInternal";
import { useMainStore } from "@/stores/main";
import { useUnitGroupStore } from "@/stores/unitGroup";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { IDRCurrency } from "@/utilities/formatter";
import { useSatuanKerjaStore } from "@/stores/satuanKerja";
import Select2 from "@/components/Select2.vue";
import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";

const props = defineProps({
  show: Boolean,
  updateData: Boolean,
});

const search = ref("");

const find = useDebounceFn((x) => {
  satkerStore.searchName = search.value;
  satkerStore.getData();
}, 500);

function handleChosen(payload) {
  monitoringInternalStore.addSatkerForm(payload);
}

const emit = defineEmits(["close", "submitStore", "submitUpdate"]);

const monitoringInternalStore = useMonitoringInternalStore();
const groupStore = useUnitGroupStore();
const mainStore = useMainStore();
const satkerStore = useSatuanKerjaStore();

async function prosesRequest() {
  emit("submitStore");
}
async function prosesUpdate() {
  emit("submitUpdate");
}
function closeModal() {
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

<template>
  <div
    v-if="show"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
  >
    <!-- Modal content -->
    <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
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
        <ul
          class="mb-4 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
        >
          <li class="mr-2">
            <a
              @click="activeTab = 0"
              aria-current="page"
              :class="
                activeTab == 0
                  ? 'inline-block p-4 text-blue-600 bg-gray-200 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500'
                  : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer'
              "
              >Detail</a
            >
          </li>
          <li class="mr-2">
            <a
              @click="activeTab = 1"
              :class="
                activeTab == 1
                  ? 'inline-block p-4 text-blue-600 bg-gray-200 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500'
                  : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer'
              "
              class=""
              >Surat Perintah</a
            >
          </li>
          <li class="mr-2">
            <a
              @click="activeTab = 2"
              :class="
                activeTab == 2
                  ? 'inline-block p-4 text-blue-600 bg-gray-200 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500'
                  : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer'
              "
              class=""
              >Output</a
            >
          </li>
        </ul>

        <form v-if="updateData" @submit.prevent="prosesUpdate()">
          <div v-if="activeTab == 0">
            <div class="flex w-full space-x-2">
              <FormField label="Tahun" class="w-full">
                <select
                  :disabled="pengawasanStore.isStoreLoading"
                  v-model="pengawasanStore.singleResponses.tahun"
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
                  :disabled="pengawasanStore.isStoreLoading"
                  v-model="pengawasanStore.singleResponses.bulan"
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

            <FormField label="Jenis Pengawasan">
              <select
                :disabled="pengawasanStore.isStoreLoading"
                v-model="pengawasanStore.singleResponses.jenis_pengawasan_id"
                required
                class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              >
                <option
                  v-for="option in jenisPengawasanStore.items"
                  :key="option"
                  :value="option.id"
                >
                  {{ option.name }}
                </option>
              </select>
            </FormField>
            <FormField label="Nama Kegiatan">
              <FormControl
                type="textarea"
                required
                v-model="pengawasanStore.singleResponses.name"
                :disabled="pengawasanStore.isStoreLoading"
                placeholder="Isi dengan name kegiatan secara jelas"
              />
            </FormField>
          </div>
          <div v-else-if="activeTab == 1">
            <div class="flex w-full space-x-2 justify-end">
              <FormField label="Nomor Surat Perintah" class="w-full">
                <FormControl
                  type="input"
                  required
                  v-model="pengawasanStore.singleResponses.sp_number"
                  :disabled="pengawasanStore.isStoreLoading"
                  placeholder="Nomor Surat Perintah"
                />
              </FormField>
              <FormField label="Tanggal" class="w-full">
                <vue-tailwind-datepicker
                  :disabled="pengawasanStore.isStoreLoading"
                  required
                  as-single
                  placeholder="Tanggal Surat Perintah"
                  v-model="pengawasanStore.singleResponses.sp_date"
                  :formatter="formatter"
                  input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
                />
              </FormField>
            </div>

            <FormField label="Tanggal Kegiatan" class="w-full">
              <vue-tailwind-datepicker
                :disabled="pengawasanStore.isStoreLoading"
                :shortcuts="false"
                required
                placeholder="Tanggal Surat Perintah"
                v-model="pengawasanStore.singleResponses.tanggalKegiatan"
                :formatter="formatter"
                input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              />
            </FormField>

            <FormField label="Lokasi Kegiatan">
              <FormControl
                type="textarea"
                required
                v-model="pengawasanStore.singleResponses.location"
                :disabled="pengawasanStore.isStoreLoading"
                placeholder="Isi dengan lokasi kegiatan"
              />
            </FormField>
          </div>
          <div v-else>
            <FormField label="Nomor dan Tanggal LHP">
              <textarea
                :disabled="pengawasanStore.isStoreLoading"
                rows="10"
                class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
                style="white-space: pre-wrap"
                v-model="pengawasanStore.singleResponses.output"
              ></textarea>
            </FormField>
          </div>
          <BaseDivider />
          <div v-if="activeTab == 0">
            <div class="flex justify-start space-x-3 items-center">
              <BaseButton type="button" color="success" @click="activeTab = 1"
                ><span>Next</span></BaseButton
              >
            </div>
          </div>
          <div v-else-if="activeTab == 1" class="flex flex-row space-x-2">
            <div class="flex justify-start space-x-3 items-center">
              <BaseButton type="button" color="danger" @click="activeTab = 0"
                ><span>Previous</span></BaseButton
              >
            </div>
            <BaseButton type="button" color="success" @click="activeTab = 2"
              ><span>Next</span></BaseButton
            >
          </div>
          <div v-else-if="activeTab == 2" class="flex flex-row space-x-2">
            <div class="flex justify-start space-x-3 items-center">
              <BaseButton type="button" color="danger" @click="activeTab = 1"
                ><span>Previous</span></BaseButton
              >
            </div>
            <div class="flex justify-start space-x-3 items-center">
              <BaseButton
                :disabled="pengawasanStore.isUpdateLoading"
                type="submit"
                color="info"
                ><span v-if="!pengawasanStore.isUpdateLoading">Update</span
                ><span class="flex flex-row items-center" v-else>
                  <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
                  Processing</span
                ></BaseButton
              >
            </div>
          </div>
        </form>
        <form v-else @submit.prevent="prosesRequest()">
          <div v-if="activeTab == 0">
            <div class="flex w-full space-x-2">
              <FormField label="Tahun" class="w-full">
                <select
                  :disabled="pengawasanStore.isStoreLoading"
                  v-model="pengawasanStore.form.tahun"
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
                  :disabled="pengawasanStore.isStoreLoading"
                  v-model="pengawasanStore.form.bulan"
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

            <FormField label="Jenis Pengawasan">
              <select
                :disabled="pengawasanStore.isStoreLoading"
                v-model="pengawasanStore.form.jenis_pengawasan_id"
                required
                class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              >
                <option
                  v-for="option in jenisPengawasanStore.items"
                  :key="option"
                  :value="option.id"
                >
                  {{ option.name }}
                </option>
              </select>
            </FormField>
            <FormField label="Nama Kegiatan">
              <FormControl
                type="textarea"
                required
                v-model="pengawasanStore.form.name"
                :disabled="pengawasanStore.isStoreLoading"
                placeholder="Isi dengan name kegiatan secara jelas"
              />
            </FormField>
          </div>
          <div v-else-if="activeTab == 1">
            <div class="flex w-full space-x-2 justify-end">
              <FormField label="Nomor Surat Perintah" class="w-full">
                <FormControl
                  type="input"
                  required
                  v-model="pengawasanStore.form.sp_number"
                  :disabled="pengawasanStore.isStoreLoading"
                  placeholder="Nomor Surat Perintah"
                />
              </FormField>
              <FormField label="Tanggal" class="w-full">
                <vue-tailwind-datepicker
                  :disabled="pengawasanStore.isStoreLoading"
                  required
                  as-single
                  placeholder="Tanggal Surat Perintah"
                  v-model="pengawasanStore.form.sp_date"
                  :formatter="formatter"
                  input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
                />
              </FormField>
            </div>

            <FormField label="Tanggal Kegiatan" class="w-full">
              <vue-tailwind-datepicker
                :disabled="pengawasanStore.isStoreLoading"
                :shortcuts="false"
                required
                placeholder="Tanggal Surat Perintah"
                v-model="pengawasanStore.form.tanggalKegiatan"
                :formatter="formatter"
                input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              />
            </FormField>

            <FormField label="Lokasi Kegiatan">
              <FormControl
                type="textarea"
                required
                v-model="pengawasanStore.form.location"
                :disabled="pengawasanStore.isStoreLoading"
                placeholder="Isi dengan lokasi kegiatan"
              />
            </FormField>
          </div>
          <div v-else>
            <FormField label="Nomor dan Tanggal LHP">
              <textarea
                :disabled="pengawasanStore.isStoreLoading"
                rows="10"
                class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
                style="white-space: pre-wrap"
                v-model="pengawasanStore.form.output"
              ></textarea>
            </FormField>
          </div>
          <BaseDivider />
          <div v-if="activeTab == 0">
            <div class="flex justify-start space-x-3 items-center">
              <BaseButton type="button" color="success" @click="activeTab = 1"
                ><span>Next</span></BaseButton
              >
            </div>
          </div>
          <div v-else-if="activeTab == 1" class="flex flex-row space-x-2">
            <div class="flex justify-start space-x-3 items-center">
              <BaseButton type="button" color="danger" @click="activeTab = 0"
                ><span>Previous</span></BaseButton
              >
            </div>
            <BaseButton type="button" color="success" @click="activeTab = 2"
              ><span>Next</span></BaseButton
            >
          </div>
          <div v-else-if="activeTab == 2" class="flex flex-row space-x-2">
            <div class="flex justify-start space-x-3 items-center">
              <BaseButton type="button" color="danger" @click="activeTab = 1"
                ><span>Previous</span></BaseButton
              >
            </div>
            <div class="flex justify-start space-x-3 items-center">
              <BaseButton
                :disabled="pengawasanStore.isStoreLoading"
                type="submit"
                color="info"
                ><span v-if="!pengawasanStore.isStoreLoading">Submit</span
                ><span class="flex flex-row items-center" v-else>
                  <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
                  Processing</span
                ></BaseButton
              >
            </div>
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
import { ref } from "vue";
import { useMainStore } from "@/stores/main";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { useJenisPengawasanStore } from "@/stores/jenisPengawasan";
import { usePengawasanStore } from "@/stores/wilayah/pengawasan";

const props = defineProps({
  show: Boolean,
  updateData: Boolean,
});

const emit = defineEmits(["close", "submitStore", "submitUpdate"]);

const pengawasanStore = usePengawasanStore();
const mainStore = useMainStore();
const jenisPengawasanStore = useJenisPengawasanStore();

const quilOptions = {
  readOnly: pengawasanStore.isStoreLoading,
  theme: "snow",
};

const activeTab = ref(0);

const formatter = ref({
  date: "DD MMMM YYYY",
});

async function prosesRequest() {
  activeTab.value = 0;
  emit("submitStore");
}
async function prosesUpdate() {
  activeTab.value = 0;
  emit("submitUpdate");
}
function closeModal() {
  activeTab.value = 0;
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

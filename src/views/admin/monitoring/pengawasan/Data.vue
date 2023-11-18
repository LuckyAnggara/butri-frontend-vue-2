<script setup>
import SectionMain from "@/components/SectionMain.vue";

import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import { useRoute } from "vue-router";
import { computed, defineAsyncComponent, onMounted, ref, watch } from "vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useDebounceFn, watchDeep } from "@vueuse/core";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/vue/24/outline";
import { useMainStore } from "@/stores/main";
import BaseButton from "@/components/BaseButton.vue";
import { usePengawasanStore } from "@/stores/wilayah/pengawasan";
import { useJenisPengawasanStore } from "@/stores/jenisPengawasan";
import { useUnitStore } from "@/stores/unit";

const showDetailModal = ref(false);

const route = useRoute();
const pengawasanStore = usePengawasanStore();
const unitStore = useUnitStore();
const mainStore = useMainStore();
const jenisPengawasanStore = useJenisPengawasanStore();

const indexDestroy = ref(0);

const isInput = ref(false);

const previousPage = computed(() => {
  return "&page=" + (pengawasanStore.currentPage - 1);
});

const nextPage = computed(() => {
  return "&page=" + (pengawasanStore.currentPage + 1);
});

watchDeep(pengawasanStore.filter, (obj) => {
  pengawasanStore.getData();
});

watch(
  () => pengawasanStore.currentLimit,
  () => {
    pengawasanStore.getData();
  }
);

onMounted(() => {
  pengawasanStore.$patch((state) => {
    state.filter.unit = 0;
  });
  pengawasanStore.getData();
  jenisPengawasanStore.getData();
  unitStore.getData();
});
</script>

<template>
  <SectionMain :max-w="false">
    <SectionTitleLineWithButton :title="route.meta.title" main />

    <CardBox class="mb-4 px-4" has-table>
      <div class="w-full my-4 flex flex-row space-x-4">
        <div class="w-1/12">
          <FormField label="Show">
            <select
              :disabled="pengawasanStore.isStoreLoading"
              v-model="pengawasanStore.currentLimit"
              class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option
                v-for="option in mainStore.limitDataOptions"
                :key="option"
                :value="option"
              >
                {{ option == 100000 ? "SEMUA" : option }}
              </option>
            </select>
          </FormField>
        </div>
        <div class="w-1/12">
          <FormField label="Tahun">
            <select
              :disabled="pengawasanStore.isLoading"
              v-model="pengawasanStore.filter.currentYear"
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
        </div>
        <div class="w-1/12">
          <FormField label="Bulan">
            <select
              :disabled="pengawasanStore.isLoading"
              v-model="pengawasanStore.filter.currentMonth"
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
        <div class="w-4/12">
          <FormField label="Unit">
            <select
              :disabled="pengawasanStore.isLoading"
              v-model="pengawasanStore.filter.unit"
              class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option :value="0">SEMUA</option>
              <option
                v-for="option in unitStore.items"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name.toUpperCase() }}
              </option>
            </select>
          </FormField>
        </div>
        <div class="w-6/12">
          <FormField label="Search">
            <FormControl
              @keyup="search"
              v-model="pengawasanStore.filter.searchQuery"
              type="tel"
              placeholder="Cari berdasarkan indikator"
            />
          </FormField>
        </div>
      </div>
    </CardBox>
    <CardBox class="mb-6" has-table>
      <table>
        <thead>
          <tr>
            <td class="text-center w-1/12">#</td>
            <td class="text-center w-1/12">Unit</td>
            <td class="text-center w-1/12">Jenis</td>
            <td class="text-center w-4/12">Nama Kegiatan</td>
            <td class="text-center w-2/12">TMT & Lokasi Kegiatan</td>
            <td class="text-center w-2/12">No & Tgl LHP</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pengawasanStore.isLoading">
            <td colspan="9" class="text-center">
              <div
                class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span
                  class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span
                >
              </div>
            </td>
          </tr>
          <template v-else>
            <tr v-if="pengawasanStore.items.length == 0">
              <td colspan="9" class="text-center">
                <span>Tidak ada data</span>
              </td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in pengawasanStore.items"
              :key="item.id"
            >
              <td class="text-center">
                {{ pengawasanStore.from + index }}
              </td>
              <td>
                {{ item.unit.name }}
              </td>
              <td>
                {{ item.jenis.name }}
              </td>

              <td class="justify-start">
                <div class="flex flex-col space-y-4">
                  <span>
                    {{ item.name }}
                  </span>
                  <div class="flex flex-col">
                    <u>Surat Perintah</u>
                    <span>
                      {{ item.sp_number }}
                    </span>
                    <span>
                      {{ item.sp_date }}
                    </span>
                  </div>
                </div>
              </td>

              <td>
                {{ item.location }} <br />
                {{ item.start_at }} - {{ item.end_at }}
              </td>
              <td>
                {{ item.output ?? "-" }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div
        class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 flex justify-end"
      >
        <ul class="inline-flex items-stretch -space-x-px">
          <li>
            <a
              @click="
                pengawasanStore.currentPage == 1
                  ? ''
                  : pengawasanStore.getData(previousPage)
              "
              :disabled="pengawasanStore.currentPage == 1 ? true : false"
              :class="
                pengawasanStore.currentPage == 1
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
              "
              class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              >Previous</a
            >
          </li>

          <li>
            <a
              @click="
                pengawasanStore.lastPage == pengawasanStore.currentPage
                  ? ''
                  : pengawasanStore.getData(nextPage)
              "
              :class="
                pengawasanStore.lastPage == pengawasanStore.currentPage
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
              "
              class="w-32 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              >Next {{
            }}</a>
          </li>
        </ul>
      </div>
    </CardBox>
  </SectionMain>
</template>

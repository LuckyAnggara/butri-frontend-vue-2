<script setup>
import SectionMain from "@/components/SectionMain.vue";

import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import { useRoute, useRouter } from "vue-router";
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useDebounceFn } from "@vueuse/core";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  ArrowPathIcon,
  PencilSquareIcon,
} from "@heroicons/vue/24/outline";
import { useMainStore } from "@/stores/main";
import BaseButton from "@/components/BaseButton.vue";
import { useRealisasiAnggaranStore } from "@/stores/keuangan/realisasi";
import { useAuthStore } from "@/stores/auth";
import { IDRCurrency, getMonthName } from "@/utilities/formatter";

const route = useRoute();
const realisasiAnggaranStore = useRealisasiAnggaranStore();
const mainStore = useMainStore();

const isInput = ref(false);

async function submit() {
  const result = await realisasiAnggaranStore.store();
  if (result) {
    isInput.value = !isInput;
  }
}

function deviasi(item) {
  var header = item.realisasi_saat_ini - item.dp_saat_ini;
  if (header == 0) {
    return 0;
  }
  0;
  return (header / item.dp_saat_ini).toFixed(2);
}

realisasiAnggaranStore.$subscribe((mutation, state) => {
  if (mutation.events.key == "currentYear") {
    realisasiAnggaranStore.getData();
  }
  if (mutation.events.key == "currentMonth") {
    realisasiAnggaranStore.getData();
  }
});

onMounted(() => {
  realisasiAnggaranStore.getData();
});
</script>

<template>
  <SectionMain :max-w="false">
    <SectionTitleLineWithButton :title="route.meta.title" main />

    <CardBox class="mb-4 px-4" has-table>
      <div class="w-full my-4 flex flex-row space-x-4">
        <div class="w-2/12">
          <FormField label="Tahun">
            <select
              :disabled="realisasiAnggaranStore.isLoading"
              v-model="realisasiAnggaranStore.filter.currentYear"
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
        <div class="w-2/12">
          <FormField label="Bulan">
            <select
              :disabled="realisasiAnggaranStore.isLoading"
              v-model="realisasiAnggaranStore.filter.currentMonth"
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
        <div class="w-6/12"></div>
        <div class="w-2/12 flex justify-end">
          <BaseButton
            v-if="isInput == false"
            @click="isInput = true"
            class="mt-8"
            color="info"
            label="Input Data"
          />
          <BaseButton
            v-else
            :disabled="realisasiAnggaranStore.isStoreLoading"
            @click="submit"
            class="mt-8"
            color="success"
            ><span v-if="!realisasiAnggaranStore.isStoreLoading">Submit</span
            ><span class="flex flex-row items-center" v-else>
              <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
              Processing</span
            ></BaseButton
          >
        </div>
      </div>
    </CardBox>
    <CardBox class="mb-6" has-table>
      <table>
        <thead>
          <tr>
            <td rowspan="2" class="text-center">Kode</td>
            <td rowspan="2" class="text-center">Kegiatan</td>
            <td rowspan="2" class="text-center">DIPA Existing</td>
            <td colspan="2" class="text-center">
              Realisasi s/d
              {{ getMonthName(realisasiAnggaranStore.filter.currentMonth - 1) }}
            </td>
            <td colspan="2" class="text-center">
              {{ getMonthName(realisasiAnggaranStore.filter.currentMonth) }}
            </td>

            <td rowspan="2" class="text-center">Deviasi (%)</td>
          </tr>
          <tr>
            <td class="text-center">Rp</td>
            <td class="text-center">%</td>
            <td class="text-center">Realisasi</td>
            <td class="text-center">DP</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="realisasiAnggaranStore.isLoading">
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
            <tr v-if="realisasiAnggaranStore.items.length == 0">
              <td colspan="9" class="text-center">
                <span>Tidak ada data</span>
              </td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in realisasiAnggaranStore.items"
              :key="item.id"
            >
              <td>
                {{ item.kode }}
              </td>
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ IDRCurrency.format(item.pagu) }}
              </td>
              <td>
                {{ IDRCurrency.format(item.total_realisasi) }}
              </td>
              <td>
                {{ ((item.total_realisasi / item.pagu) * 100).toFixed(2) }}
                %
              </td>
              <td>
                <span v-if="!isInput">
                  {{ IDRCurrency.format(item.realisasi_saat_ini) }}</span
                >
                <FormControl
                  v-else
                  :disabled="!isInput"
                  v-model="item.realisasi_saat_ini"
                  type="number"
                />
              </td>
              <td>
                <span v-if="!isInput">
                  {{ IDRCurrency.format(item.dp_saat_ini) }}</span
                >
                <FormControl
                  v-else
                  :disabled="!isInput"
                  v-model="item.dp_saat_ini"
                  type="number"
                />
              </td>
              <td>
                {{ deviasi(item) }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colspan="2">Total Pagu</th>
            <th>{{ IDRCurrency.format(realisasiAnggaranStore.totalPagu) }}</th>
            <th>
              {{ IDRCurrency.format(realisasiAnggaranStore.totalRealisasi) }}
            </th>
            <th>
              {{
                (
                  (realisasiAnggaranStore.totalRealisasi /
                    realisasiAnggaranStore.totalPagu) *
                  100
                ).toFixed(2)
              }}
              %
            </th>
            <th>
              {{
                IDRCurrency.format(realisasiAnggaranStore.totalRealisasiSaatIni)
              }}
            </th>
            <th>
              {{ IDRCurrency.format(realisasiAnggaranStore.totalDPSaatIni) }}
            </th>
          </tr>
        </tfoot>
      </table>
      <div
        class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 flex justify-end"
      ></div>
    </CardBox>

    <!-- Modal -->
  </SectionMain>
</template>

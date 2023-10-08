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
import { useIkpaStore } from "@/stores/keuangan/ikpa";
import { useAuthStore } from "@/stores/auth";
import { IDRCurrency, getMonthName } from "@/utilities/formatter";

const route = useRoute();
const ikpaStore = useIkpaStore();
const mainStore = useMainStore();

const isInput = ref(false);

async function submit() {
  const result = await ikpaStore.store();
  if (result) {
    isInput.value = !isInput;
    ikpaStore.getData();
  }
}

function readyEdit() {
  ikpaStore.readyEdit();
  isInput.value = true;
}

function cancel() {
  ikpaStore.cancelEdit();
  isInput.value = !isInput.value;
}

ikpaStore.$subscribe((mutation, state) => {
  if (mutation.events.key == "currentYear") {
    ikpaStore.getData();
  }
  if (mutation.events.key == "currentMonth") {
    ikpaStore.getData();
  }
});

onMounted(() => {
  ikpaStore.getData();
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
              :disabled="ikpaStore.isLoading"
              v-model="ikpaStore.filter.currentYear"
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
              :disabled="ikpaStore.isLoading"
              v-model="ikpaStore.filter.currentMonth"
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
        <div class="w-2/12 flex justify-end space-x-2">
          <BaseButton
            v-if="isInput == false"
            @click="readyEdit"
            class="mt-8"
            color="info"
            label="Input Data"
          />
          <template v-else>
            <BaseButton
              :disabled="ikpaStore.isStoreLoading"
              @click="cancel()"
              class="mt-8"
              color="danger"
              label="Cancel"
            />
            <BaseButton
              :disabled="ikpaStore.isStoreLoading"
              @click="submit"
              class="mt-8"
              color="success"
              ><span v-if="!ikpaStore.isStoreLoading">Submit</span
              ><span class="flex flex-row items-center" v-else>
                <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
                Processing</span
              ></BaseButton
            >
          </template>
        </div>
      </div>
    </CardBox>
    <CardBox class="mb-6" has-table>
      <table>
        <thead>
          <tr>
            <td rowspan="2">Keterangan</td>
            <td colspan="2" class="text-center">
              Kualitas Perencanaan Anggaran
            </td>
            <td colspan="5" class="text-center">
              Kualitas Pelaksanaan Anggaran
            </td>
            <td class="text-center">Kualitas Hasil Pelaksanaan Anggaran</td>
            <td rowspan="2">Nilai Total</td>
            <td rowspan="2">Konversi Bobot</td>
            <td rowspan="2" class="w-36">
              Nilai Akhir (Nilai Total / Konv. Bobot)
            </td>
          </tr>
          <tr>
            <td class="text-center">Revisi DIPA</td>
            <td class="text-center">Deviasi Hal III DIPA</td>
            <td class="text-center">Penyerapan Anggaran</td>
            <td class="text-center">Belanja Kontraktual</td>
            <td class="text-center">Penyelesaian Tagihan</td>
            <td class="text-center">Pengelolaan UP dan TUP</td>
            <td class="text-center">Dispensasi SPM</td>
            <td class="text-center">Capaian Output</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="ikpaStore.isLoading">
            <td colspan="12" class="text-center">
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
            <tr>
              <td>Nilai</td>
              <td class="text-center">
                <span v-if="!isInput"> {{ ikpaStore.items.revisi_dipa }}</span>
                <FormControl
                  v-else
                  :disabled="!isInput"
                  v-model="ikpaStore.items.revisi_dipa"
                  type="number"
                />
              </td>
              <td class="text-center">
                <span v-if="!isInput">
                  {{ ikpaStore.items.halaman_tiga_dipa }}</span
                >
                <FormControl
                  v-else
                  :disabled="!isInput"
                  v-model="ikpaStore.items.halaman_tiga_dipa"
                  type="number"
                />
              </td>
              <td class="text-center">
                <span v-if="!isInput">
                  {{ ikpaStore.items.penyerapan_anggaran }}</span
                >
                <FormControl
                  v-else
                  :disabled="!isInput"
                  v-model="ikpaStore.items.penyerapan_anggaran"
                  type="number"
                />
              </td>
              <td class="text-center">
                <span v-if="!isInput">
                  {{ ikpaStore.items.belanja_kontraktual }}</span
                >
                <FormControl
                  v-else
                  :disabled="!isInput"
                  v-model="ikpaStore.items.belanja_kontraktual"
                  type="number"
                />
              </td>
              <td class="text-center">
                <span v-if="!isInput">
                  {{ ikpaStore.items.penyelesaian_tagihan }}</span
                >
                <FormControl
                  v-else
                  :disabled="!isInput"
                  v-model="ikpaStore.items.penyelesaian_tagihan"
                  type="number"
                />
              </td>
              <td class="text-center">
                <span v-if="!isInput">
                  {{ ikpaStore.items.pengelolaan_up_tup }}</span
                >
                <FormControl
                  v-else
                  :disabled="!isInput"
                  v-model="ikpaStore.items.pengelolaan_up_tup"
                  type="number"
                />
              </td>
              <td class="text-center">
                <span v-if="!isInput">
                  {{ ikpaStore.items.dispensasi_spm }}</span
                >
                <FormControl
                  v-else
                  :disabled="!isInput"
                  v-model="ikpaStore.items.dispensasi_spm"
                  type="number"
                />
              </td>
              <td class="text-center">
                <span v-if="!isInput">
                  {{ ikpaStore.items.capaian_output }}</span
                >
                <FormControl
                  v-else
                  :disabled="!isInput"
                  v-model="ikpaStore.items.capaian_output"
                  type="number"
                />
              </td>
              <th rowspan="4">{{ ikpaStore.nilaiTotal.toFixed(2) }}</th>
              <th rowspan="4">100%</th>
              <th rowspan="4">{{ ikpaStore.nilaiTotal.toFixed(2) }}</th>
            </tr>
            <tr>
              <td>Bobot</td>
              <td class="text-center">10</td>
              <td class="text-center">10</td>
              <td class="text-center">20</td>
              <td class="text-center">10</td>
              <td class="text-center">10</td>
              <td class="text-center">10</td>
              <td class="text-center">5</td>
              <td class="text-center">25</td>
            </tr>
            <tr>
              <td>Nilai Akhir</td>
              <td class="text-center">
                <span>
                  {{
                    ((10 / 100) * ikpaStore.items.revisi_dipa).toFixed(2)
                  }}</span
                >
              </td>
              <td class="text-center">
                <span>
                  {{
                    ((10 / 100) * ikpaStore.items.halaman_tiga_dipa).toFixed(2)
                  }}</span
                >
              </td>
              <td class="text-center">
                <span>
                  {{
                    ((20 / 100) * ikpaStore.items.penyerapan_anggaran).toFixed(
                      2
                    )
                  }}</span
                >
              </td>
              <td class="text-center">
                <span>
                  {{
                    ((10 / 100) * ikpaStore.items.belanja_kontraktual).toFixed(
                      2
                    )
                  }}</span
                >
              </td>
              <td class="text-center">
                <span>
                  {{
                    ((10 / 100) * ikpaStore.items.penyelesaian_tagihan).toFixed(
                      2
                    )
                  }}</span
                >
              </td>
              <td class="text-center">
                <span>
                  {{
                    ((10 / 100) * ikpaStore.items.pengelolaan_up_tup).toFixed(2)
                  }}</span
                >
              </td>
              <td class="text-center">
                <span>
                  {{
                    ((5 / 100) * ikpaStore.items.dispensasi_spm).toFixed(2)
                  }}</span
                >
              </td>
              <td class="text-center">
                <span>
                  {{
                    ((25 / 100) * ikpaStore.items.capaian_output).toFixed(2)
                  }}</span
                >
              </td>
            </tr>
            <tr>
              <td>Nilai Aspek</td>
              <th class="text-center" colspan="2">
                <span>
                  {{
                    (
                      (ikpaStore.items.revisi_dipa +
                        ikpaStore.items.halaman_tiga_dipa) /
                      2
                    ).toFixed(2)
                  }}</span
                >
              </th>

              <th class="text-center" colspan="5">
                <span> {{ ikpaStore.nilaiAspek_2.toFixed(2) }}</span>
              </th>

              <th class="text-center">
                <span> {{ ikpaStore.items.capaian_output }}</span>
              </th>
            </tr>
          </template>
        </tbody>
      </table>
      <div
        class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 flex justify-end"
      ></div>
    </CardBox>

    <!-- Modal -->
  </SectionMain>
</template>

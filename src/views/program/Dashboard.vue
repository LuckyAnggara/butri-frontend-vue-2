<script setup>
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import SectionMain from "@/components/SectionMain.vue";

import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useDashboardProgramStore } from "@/stores/program/dashboardProgram";
import CardBox from "@/components/CardBox.vue";
import { useMainStore } from "@/stores/main";
import FormField from "@/components/FormField.vue";
import { IDRCurrency, getMonthName } from "@/utilities/formatter";
import { mdiAccountMultiple, mdiGenderFemale, mdiGenderMale } from "@mdi/js";
import { watchDeep, whenever } from "@vueuse/core";

const dashboardStore = useDashboardProgramStore();
const mainStore = useMainStore();

function nilaiKinerja(item) {
  var nki =
    item.penyerapan * 0.097 +
    item.konsistensi * 0.182 +
    item.capaian_output_program * 0.435 +
    item.nilai_efisiensi * 0.286;
  var nka = nki * 0.333 + item.capaian_sasaran_program * 0.667;
  var result = (nka + item.rata_nka_satker) / 2;
  return result.toFixed(2);
}

watchDeep(dashboardStore.filter, (obj) => {
  dashboardStore.getData();
});

// whenever(
//   () => dashboardStore.filter.currentMonth,
//   () => {
//     dashboardStore.getData();
//   }
// );

// whenever(
//   () => dashboardStore.filter.currentYear,
//   () => {
//     dashboardStore.getData();
//   }
// );

// watch(
//   () => dashboardStore.filter,
//   () => {
//     console.info("move");
//     dashboardStore.getData();
//   }
// );

// dashboardStore.$subscribe(
//   (mutation, state) => {
//     console.info(mutation?.events);
//     if (mutation.events?.key == "currentYear") {

//     }
//     if (mutation.events?.key == "currentMonth") {
//       dashboardStore.getData();
//     }
//   },
//   { flush: "sync" }
// );

onMounted(() => {
  dashboardStore.getData();
});

const route = useRoute();
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <NotificationBar color="contrast" v-if="dashboardStore.responses == null">
      <span class="flex flex-row items-center text-center w-full">
        <ArrowPathIcon
          class="h-6 w-6 animate-spin mr-3 dark:text-gray-800 text-white"
        />
        Fetching data ... please wait ...</span
      >
    </NotificationBar>
    <div v-else class="space-y-4">
      <div class="flex space-x-2">
        <div class="w-2/12">
          <FormField label="Tahun">
            <select
              :disabled="dashboardStore.isLoading"
              v-model="dashboardStore.filter.currentYear"
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
          <FormField label=" Bulan">
            <select
              :disabled="dashboardStore.isLoading"
              v-model="dashboardStore.filter.currentMonth"
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
      </div>
      <div>
        <CardBox class="mb-6 shadow-md" has-table>
          <h1 class="text-4xl mb-4 pt-4 pl-4">Anggaran</h1>
          <div class="w-2/12 p-4">
            <FormField label="Jenis">
              <select
                :disabled="dashboardStore.isStoreLoading"
                v-model="dashboardStore.filter.jenisAnggaran"
                class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              >
                <option value="kegiatan">Kegiatan</option>
                <option value="belanja">Belanja</option>
              </select>
            </FormField>
          </div>
          <table>
            <thead>
              <tr>
                <td
                  rowspan="2"
                  class="text-center"
                  v-if="dashboardStore.filter.jenisAnggaran == 'kegiatan'"
                >
                  Kode
                </td>
                <td rowspan="2" class="text-center">Kegiatan</td>
                <td rowspan="2" class="text-center">DIPA Existing</td>
                <td colspan="2" class="text-center">
                  Realisasi s/d
                  {{ getMonthName(dashboardStore.filter.currentMonth) }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-if="dashboardStore.isLoading">
                <td
                  :colspan="
                    dashboardStore.filter.jenisAnggaran == 'kegiatan' ? 9 : 8
                  "
                  class="text-center"
                >
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
                <tr v-if="dashboardStore.dataRealisasi.length == 0">
                  <td
                    :colspan="
                      dashboardStore.filter.jenisAnggaran == 'kegiatan' ? 9 : 8
                    "
                    class="text-center"
                  >
                    <span>Tidak ada data</span>
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="item in dashboardStore.dataRealisasi"
                  :key="item.id"
                >
                  <td v-if="dashboardStore.filter.jenisAnggaran == 'kegiatan'">
                    {{ item.kode }}
                  </td>
                  <td>
                    {{ item.name }}
                  </td>
                  <td>
                    {{ IDRCurrency.format(item.pagu) }}
                  </td>
                  <td>
                    {{ IDRCurrency.format(item.realisasi_saat_ini) }}
                  </td>
                  <td>
                    {{
                      ((item.realisasi_saat_ini / item.pagu) * 100).toFixed(2)
                    }}
                    %
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  :colspan="
                    dashboardStore.filter.jenisAnggaran == 'kegiatan' ? 2 : 1
                  "
                >
                  Total Pagu
                </th>
                <th>
                  {{ IDRCurrency.format(dashboardStore.totalPagu) }}
                </th>
                <th>
                  {{ IDRCurrency.format(dashboardStore.totalRealisasi) }}
                </th>
                <th>
                  {{
                    (
                      (dashboardStore.totalRealisasi /
                        dashboardStore.totalPagu) *
                      100
                    ).toFixed(2)
                  }}
                  %
                </th>
              </tr>
            </tfoot>
          </table>
          <div
            class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 flex justify-end"
          >
            <small class="italic"
              >data s.d
              {{
                mainStore.bulanOptions[dashboardStore.filter.currentMonth - 1]
                  .label
              }}
              2023</small
            >
          </div>
        </CardBox>
      </div>

      <div>
        <CardBox class="mb-6 shadow-md" has-table>
          <h1 class="text-4xl mb-4 pt-4 pl-4">Nilai Kinerja</h1>

          <table>
            <thead>
              <tr>
                <td class="text-center">Bulan</td>
                <td class="text-center">Capaian Sasaran Program</td>
                <td class="text-center">Penyerapan</td>
                <td class="text-center">Konsistensi</td>
                <td class="text-center">Capaian Output Program</td>
                <td class="text-center">Efisiensi</td>
                <td class="text-center">Nilai Efisiensi</td>
                <td class="text-center">Rata Rata NKA Satker</td>
                <td class="text-center">Nilai Kinerja</td>
              </tr>
            </thead>
            <tbody>
              <tr v-if="dashboardStore.isLoading">
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
                <tr v-if="dashboardStore.dataKinerjaKeuangan.length == 0">
                  <td colspan="9" class="text-center">
                    <span>Tidak ada data</span>
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="item in dashboardStore.dataKinerjaKeuangan"
                  :key="item.bulan"
                >
                  <td>
                    {{ getMonthName(item.bulan) }}
                  </td>
                  <td>
                    {{ item.capaian_sasaran_program }}
                  </td>
                  <td>
                    {{ item.penyerapan }}
                  </td>
                  <td>
                    {{ item.konsistensi }}
                  </td>
                  <td>
                    {{ item.capaian_output_program }}
                  </td>
                  <td>
                    {{ item.efisiensi }}
                  </td>
                  <td>
                    {{ item.nilai_efisiensi }}
                  </td>
                  <td>
                    {{ item.rata_nka_satker }}
                  </td>
                  <td>
                    {{ nilaiKinerja(item) }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <div
            class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 flex justify-end"
          >
            <small class="italic"
              >data s.d
              {{
                mainStore.bulanOptions[dashboardStore.filter.currentMonth - 1]
                  .label
              }}
              2023</small
            >
          </div>
        </CardBox>
      </div>

      <div>
        <CardBox class="mb-6 shadow-md" has-table>
          <h1 class="text-4xl mb-4 pt-4 pl-4">Nilai IKPA</h1>

          <table>
            <thead>
              <tr>
                <td class="text-center">Bulan</td>
                <td class="text-center">Kualitas Perencanaan Anggaran</td>
                <td class="text-center">Kualitas Pelaksanaan Anggaran</td>
                <td class="text-center">Kualitas Hasil Pelaksanaan Anggaran</td>
              </tr>
            </thead>
            <tbody>
              <tr v-if="dashboardStore.isLoading">
                <td colspan="4" class="text-center">
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
                <tr v-if="dashboardStore.dataIkpa.length == 0">
                  <td colspan="4" class="text-center">
                    <span>Tidak ada data</span>
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="item in dashboardStore.dataIkpa"
                  :key="item.bulan"
                >
                  <td>
                    {{ getMonthName(item.bulan) }}
                  </td>
                  <td>
                    {{ item.kualitas_perencanaan_anggaran.toFixed(2) }}
                  </td>
                  <td>
                    {{ item.kualitas_pelaksanaan_anggaran.toFixed(2) }}
                  </td>
                  <td>
                    {{ item.kualitas_hasil.toFixed(2) }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <div
            class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 flex justify-end"
          >
            <small class="italic"
              >data s.d
              {{
                mainStore.bulanOptions[dashboardStore.filter.currentMonth - 1]
                  .label
              }}
              2023</small
            >
          </div>
        </CardBox>
      </div>

      <div>
        <h1 class="text-4xl mb-4">Kepegawaian</h1>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            trend="-"
            trend-type="alert"
            color="text-emerald-500"
            :icon="mdiAccountMultiple"
            :number="dashboardStore.dataKepegawaian.pegawai"
            suffix=" orang"
            label="Total Pegawai"
          />
          <CardBoxWidget
            trend="-"
            trend-type="alert"
            color="text-blue-500"
            :icon="mdiGenderMale"
            :number="dashboardStore.dataKepegawaian.laki"
            suffix=" orang"
            label="Laki - Laki"
          />
          <CardBoxWidget
            trend="-"
            trend-type="alert"
            color="text-red-500"
            :icon="mdiGenderFemale"
            :number="dashboardStore.dataKepegawaian.perempuan"
            suffix=" orang"
            label="Perempuan"
          />
        </div>
      </div>

      <CardBox class="mb-6 shadow-md" has-table>
        <h1 class="text-4xl mb-4 p-4">Data Pengawasan</h1>
        <table>
          <thead>
            <tr>
              <th>Jenis Pengawasan</th>
              <th>Jumlah Kegiatan</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="dashboardStore.isLoading">
              <td colspan="2" class="text-center">
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
              <tr
                v-for="(item, index) in dashboardStore.dataPengawasan"
                :key="item.id"
              >
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.jumlah }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <div
          class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 flex justify-end"
        >
          <small class="italic"
            >data bulan
            {{
              mainStore.bulanOptions[dashboardStore.filter.currentMonth - 1]
                .label
            }}
            2023</small
          >
        </div>
      </CardBox>

      <CardBox class="mb-6 shadow-md" has-table>
        <h1 class="text-4xl mb-4 p-4">Capaian Indikator Kegiatan Utama</h1>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Indikator</th>
              <th>Target</th>
              <th>Realisasi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="dashboardStore.isLoading">
              <td colspan="5" class="text-center">
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
              <tr v-if="dashboardStore.dataCapaianIku.length == 0">
                <td colspan="5" class="text-center">
                  <span>Tidak ada data</span>
                </td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in dashboardStore.dataCapaianIku"
                :key="item.id"
              >
                <td class="text-center">
                  {{ ++index }}
                </td>
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.target }}
                </td>
                <td>
                  {{ item.realisasi?.realisasi ?? "-" }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div
          class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 flex justify-end"
        >
          <small class="italic"
            >data s.d
            {{
              mainStore.bulanOptions[dashboardStore.filter.currentMonth - 1]
                .label
            }}
            2023</small
          >
        </div>
      </CardBox>
    </div>
  </SectionMain>
</template>

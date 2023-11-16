<script setup>
import CardBox from "@/components/CardBox.vue";
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import SectionMain from "@/components/SectionMain.vue";

import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useDashboardKepegawaianStore } from "@/stores/pegawai/dashboard";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { mdiAccountMultiple, mdiGenderFemale, mdiGenderMale } from "@mdi/js";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const dashboardStore = useDashboardKepegawaianStore();

function callData() {
  dashboardStore.getData();
}

onMounted(() => {
  callData();
});
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
    <div v-else>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          trend="-"
          trend-type="alert"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="dashboardStore.dataUmum.pegawai"
          suffix=" orang"
          label="Total Pegawai"
        />
        <CardBoxWidget
          trend="-"
          trend-type="alert"
          color="text-blue-500"
          :icon="mdiGenderMale"
          :number="dashboardStore.dataUmum.laki"
          suffix=" orang"
          label="Laki - Laki"
        />
        <CardBoxWidget
          trend="-"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiGenderFemale"
          :number="dashboardStore.dataUmum.perempuan"
          suffix=" orang"
          label="Perempuan"
        />
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <CardBox class="mb-6 shadow-md w-full" has-table>
          <h1 class="text-4xl mb-4 p-4">Data Kepangkatan</h1>
          <table>
            <thead>
              <tr>
                <th>Pangkat</th>
                <th>Jumlah Pegawai</th>
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
                <tr v-for="item in dashboardStore.dataPangkat" :key="item.id">
                  <td>{{ item.pangkat }} - {{ item.ruang }}</td>
                  <td>
                    {{ item.jumlah }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>

          <!-- <div
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
          </div> -->
        </CardBox>
        <CardBox class="mb-6 shadow-md w-full" has-table>
          <h1 class="text-4xl mb-4 p-4">Data Jabatan</h1>
          <table>
            <thead>
              <tr>
                <th>Pangkat</th>
                <th>Jumlah Pegawai</th>
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
                <tr v-for="item in dashboardStore.dataJabatan" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>
                    {{ item.jumlah }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>

          <!-- <div
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
          </div> -->
        </CardBox>
      </div>
    </div>
  </SectionMain>
</template>

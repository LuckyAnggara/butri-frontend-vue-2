<script setup>
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import SectionMain from "@/components/SectionMain.vue";

import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useDashboardWilayahStore } from "@/stores/wilayah/dashboardWilayah";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import {
  mdiAccountMultiple,
  mdiCash100,
  mdiGenderFemale,
  mdiGenderMale,
} from "@mdi/js";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const dashboardStore = useDashboardWilayahStore();

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
    <div v-else class="space-y-4">
      <div class="flex space-x-2">
        <CardBoxWidget
          class="min-w-fit w-1/3"
          color="text-emerald-500"
          :number="dashboardStore.responses.anggaran.pagu"
          prefix="Rp. "
          label="Anggaran"
        />
        <CardBoxWidget
          class="min-w-fit w-1/3"
          color="text-emerald-500"
          :number="dashboardStore.responses.anggaran.total_realisasi"
          prefix="Rp. "
          label="Realisasi"
        />
        <CardBoxWidget
          class="min-w-fit w-1/3"
          color="text-emerald-500"
          :number="
            dashboardStore.responses.anggaran.total_realisasi /
            dashboardStore.responses.anggaran.pagu
          "
          suffix="%"
          label="Realisasi"
        />
      </div>

      <div>
        <CardBox class="mb-6 shadow-md" has-table>
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
                  v-for="(item, index) in dashboardStore.responses.pengawasan"
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
          ></div>
        </CardBox>
      </div>
    </div>
  </SectionMain>
</template>

<script setup>
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
          :number="dashboardStore.responses.pegawai"
          suffix=" orang"
          label="Total Pegawai"
        />
        <CardBoxWidget
          trend="-"
          trend-type="alert"
          color="text-blue-500"
          :icon="mdiGenderMale"
          :number="dashboardStore.responses.laki"
          suffix=" orang"
          label="Laki - Laki"
        />
        <CardBoxWidget
          trend="-"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiGenderFemale"
          :number="dashboardStore.responses.perempuan"
          suffix=" orang"
          label="Perempuan"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction
            :amount="dashboardStore.responses.kepangkatan"
            :date="'BULAN INI'"
            :business="'PENSIUN'"
            :type="'PENSIUN'"
            :name="'asdasdasd'"
            :account="'PENSIUN'"
          />
        </div>
      </div>
    </div>
  </SectionMain>
</template>

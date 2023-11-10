<script setup>
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import SectionMain from "@/components/SectionMain.vue";

import * as chartConfig from "@/components/Charts/chart.config.js";

import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import LineChart from "./LineChart.vue";
import { useDashboardKeuanganStore } from "@/stores/keuangan/dashboardKeuangan";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import { mdiChartPie } from "@mdi/js";

const dashboardStore = useDashboardKeuanganStore();
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
    <div v-else>
      <SectionTitleLineWithButton title="Realisasi Anggaran (dalam %)">
        <BaseButton
          :icon="mdiReload"
          color="whiteDark"
          @click="fillChartData"
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div v-if="dashboardStore.dataset.datasets">
          <line-chart class="h-96" />
        </div>
      </CardBox>
    </div>
  </SectionMain>
</template>

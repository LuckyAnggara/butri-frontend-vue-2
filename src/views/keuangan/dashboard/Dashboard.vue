<script setup>
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import SectionMain from "@/components/SectionMain.vue";

import * as chartConfig from "@/components/Charts/chart.config.js";

import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useDashboardKepegawaianStore } from "@/stores/pegawai/dashboard";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { mdiAccountMultiple, mdiGenderFemale, mdiGenderMale } from "@mdi/js";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import LineChart from "./LineChart.vue";

const route = useRoute();

const dashboardStore = useDashboardKepegawaianStore();

function callData() {
  dashboardStore.getData();
}

const chartData = ref(null);

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {});

onMounted(() => {
  callData();
  fillChartData();
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
      <SectionTitleLineWithButton :icon="mdiChartPie" title="Trends overview">
        <BaseButton
          :icon="mdiReload"
          color="whiteDark"
          @click="fillChartData"
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div v-if="chartData">
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox>
    </div>
  </SectionMain>
</template>

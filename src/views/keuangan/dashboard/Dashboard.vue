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
import { useDashboardKeuanganStore } from "@/stores/keuangan/dashboardKeuangan";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import { mdiChartPie } from "@mdi/js";
import { useMainStore } from "@/stores/main";
import FormField from "@/components/FormField.vue";

const dashboardStore = useDashboardKeuanganStore();
const mainStore = useMainStore();

dashboardStore.$subscribe((mutation, state) => {
  if (mutation.events.key == "currentYear") {
    dashboardStore.getData();
  }
  if (mutation.events.key == "currentMonth") {
    dashboardStore.getData();
  }
});

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
          <FormField label=" Tahun">
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
      <h1 class="text-4xl">Realisasi Anggaran</h1>
      <div class="flex space-x-2">
        <CardBoxWidget
          class="min-w-fit w-1/3"
          color="text-emerald-500"
          :number="dashboardStore.responses.totalPagu ?? 0"
          prefix="Rp. "
          label="Anggaran"
        />
        <CardBoxWidget
          class="min-w-fit w-1/3"
          color="text-emerald-500"
          :number="dashboardStore.responses.totalRealisasi ?? 0"
          prefix="Rp. "
          label="Realisasi"
        />
        <CardBoxWidget
          class="min-w-fit w-1/3"
          color="text-emerald-500"
          :number="
            parseFloat(
              (
                (dashboardStore.responses.totalRealisasi /
                  dashboardStore.responses.totalPagu) *
                100
              ).toFixed(2)
            )
          "
          suffix="%"
          label="Realisasi"
        />
      </div>
    </div>
  </SectionMain>
</template>

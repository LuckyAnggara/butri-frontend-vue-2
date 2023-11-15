<script setup>
import SectionMain from "@/components/SectionMain.vue";

import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import DashboardProgram from "@/views/program/Dashboard.vue";
import DashboardKeuangan from "@/views/keuangan/dashboard/Dashboard.vue";
import DashboardKepegawaian from "@/views/kepegawaian/Dashboard.vue";
import DashboardWilayah from "@/views/wilayah/Dashboard.vue";

import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const authStore = useAuthStore();
</script>

<template>
  <template v-if="authStore.unitID > 7">
    <DashboardWilayah />
  </template>
  <template v-else-if="authStore.unitID == 4">
    <DashboardProgram />
  </template>
  <template v-else-if="authStore.unitID == 5">
    <DashboardKeuangan />
  </template>
  <template v-else-if="authStore.unitID == 6">
    <DashboardKepegawaian />
  </template>
  <template v-else-if="authStore.unitID == 7">
    <SectionMain>
      <SectionTitleLineWithButton :title="route.meta.title" main />
    </SectionMain>
  </template>
  <template v-else>
    <SectionMain>
      <SectionTitleLineWithButton :title="route.meta.title" main />
    </SectionMain>
  </template>
</template>

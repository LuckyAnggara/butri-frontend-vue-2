<script setup>
import SectionMain from "@/components/SectionMain.vue";

import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import { useRoute } from "vue-router";
import { computed, onMounted, onUnmounted } from "vue";
import { useCapaianIKU } from "@/stores/all/capaianIku";
import { getMonthName } from "@/utilities/formatter";
import NotificationBar from "@/components/NotificationBar.vue";
import { useIKUStore } from "@/stores/admin/iku";

import { ArrowPathIcon } from "@heroicons/vue/24/outline";

const route = useRoute();

const capaianIKUStore = useCapaianIKU();

const id = computed(() => {
  return route.params.id ?? null;
});

onMounted(async () => {
  await capaianIKUStore.showData(id.value);
});

onUnmounted(() => {
  capaianIKUStore.$reset();
});
</script>

<template>
  <SectionMain :max-w="false">
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <NotificationBar
      v-if="capaianIKUStore.singleResponses == null"
      color="info"
    >
      <span class="flex flex-row items-center">
        <ArrowPathIcon class="h-6 w-6 animate-spin mr-3" />
        Fetching data ... please wait ...</span
      >
    </NotificationBar>
    <CardBox class="mb-4 px-4">
      <div class="w-full my-4 flex">
        <h4 class="text-2xl">{{ capaianIKUStore.singleResponses?.name }}</h4>
      </div>
    </CardBox>
    <CardBox class="mb-6" has-table>
      <table>
        <thead>
          <tr>
            <!-- <th>Bulan</th> -->
            <th>Realisasi</th>
            <th>% Capaian</th>
            <th>Analisa</th>
            <th>Kegiatan</th>
            <th>Kendala / Hambatan</th>
            <!-- <th /> -->
          </tr>
        </thead>
        <tbody>
          <tr v-if="capaianIKUStore.singleResponses?.capaian?.length == 0">
            <td colspan="5" class="text-center">
              <span>Tidak ada data</span>
            </td>
          </tr>
          <tr
            v-else
            v-for="item in capaianIKUStore.singleResponses?.capaian"
            :key="item.id"
          >
            <!-- <td class="text-center">
              {{ getMonthName(item.bulan) + " " + item.tahun }}
            </td> -->
            <td>
              <div v-html="item.realisasi"></div>
            </td>
            <td>
              <div v-html="item.capaian"></div>
            </td>
            <td>
              <div v-html="item.analisa"></div>
            </td>
            <td>
              <div v-html="item.kegiatan"></div>
            </td>
            <td>
              <div v-html="item.kendala"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </CardBox>
  </SectionMain>
</template>

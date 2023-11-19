<script setup>
import SectionMain from "@/components/SectionMain.vue";

import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useRoute } from "vue-router";
import { computed, onMounted, onUnmounted } from "vue";
import { getMonthName } from "@/utilities/formatter";
import NotificationBar from "@/components/NotificationBar.vue";

import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { useCapaianIkk } from "@/stores/all/capaianIkk";

const route = useRoute();

const capaianIKKStore = useCapaianIkk();

const id = computed(() => {
  return route.params.id ?? null;
});

onMounted(async () => {
  console.info("xx");
  await capaianIKKStore.showData(id.value);
});

onUnmounted(() => {
  capaianIKKStore.$reset();
});
</script>

<template>
  <SectionMain :max-w="false">
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <template v-if="capaianIKKStore.singleResponses == null">
      <NotificationBar color="info">
        <span class="flex flex-row items-center">
          <ArrowPathIcon class="h-6 w-6 animate-spin mr-3" />
          Fetching data ... please wait ...</span
        >
      </NotificationBar>
    </template>
    <template v-else>
      <CardBox>
        <FormField label="Unit">
          <FormControl
            v-model="capaianIKKStore.singleResponses.group.name"
            :disabled="true"
            required
          />
        </FormField>
        <FormField label="Indikator Kegiatan">
          <FormControl
            v-model="capaianIKKStore.singleResponses.name"
            :disabled="true"
            required
          />
        </FormField>
        <FormField label="Target">
          <FormControl
            v-model="capaianIKKStore.singleResponses.target"
            :disabled="true"
            required
          />
        </FormField>

        <table>
          <thead>
            <tr>
              <th class="w-1/12">Bulan</th>
              <th class="w-1/12">Realisasi</th>
              <th class="w-1/12">% Capaian</th>
              <th class="w-5/12">Analisis</th>
              <th class="w-4/12">Kendala / Hambatan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="capaianIKKStore.singleResponses.capaian.length == 0">
              <td colspan="6" class="text-center">
                <span>Tidak ada data</span>
              </td>
            </tr>
            <tr
              v-else
              v-for="item in capaianIKKStore.singleResponses.capaian"
              :key="item.id"
            >
              <td>
                {{ getMonthName(item.bulan) }}
              </td>
              <td>
                {{ item.realisasi }}
              </td>
              <td>
                {{ item.capaian }}
              </td>
              <td>
                {{ item.analisis ?? "-" }}
              </td>
              <td>
                {{ item.kendala ?? "-" }}
              </td>
            </tr>
          </tbody>
        </table>
      </CardBox>
    </template>
  </SectionMain>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRoute, useRouter } from "vue-router";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";

import { useToast } from "vue-toastification";
import { useCapaianIkk } from "@/stores/all/capaianIkk";
import { useIKKStore } from "@/stores/admin/ikk";
import { useAuthStore } from "@/stores/auth";
import NotificationBar from "@/components/NotificationBar.vue";
import { useMainStore } from "@/stores/main";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const ikkStore = useIKKStore();
const capaianIKKStore = useCapaianIkk();
const authStore = useAuthStore();
const mainStore = useMainStore();

const quilOptions = {
  readOnly: capaianIKKStore.isUpdateLoading,
  theme: "snow",
};

function toList() {
  router.push({ name: "list-capaian-ikk" });
}

async function submit() {
  if (
    capaianIKKStore.capaianResponses.ikk_id ||
    capaianIKKStore.capaianResponses.realisasi
  ) {
    await capaianIKKStore.updateCapaian();
    router.push({
      name: "detail-capaian-ikk",
      params: { id: capaianIKKStore.capaianResponses.ikk_id },
    });
  } else {
    toast.error("Data belum lengkap", { timeout: 2000 });
    return false;
  }
}

const id = computed(() => {
  return route.params.id ?? null;
});

onMounted(async () => {
  ikkStore.$patch((state) => {
    state.filter.unit = authStore.user.user.unit.group_id;
  });
  ikkStore.getData();
  capaianIKKStore.showCapaian(id.value);
  ikkStore.$patch((state) => {
    state.filter.unit = authStore.user.user.unit.group_id;
  });
});

onUnmounted(() => {
  capaianIKKStore.$reset();
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <NotificationBar
      v-if="capaianIKKStore.capaianResponses == null"
      color="info"
    >
      <span class="flex flex-row items-center">
        <ArrowPathIcon class="h-6 w-6 animate-spin mr-3" />
        Fetching data ... please wait ...</span
      >
    </NotificationBar>
    <template v-else>
      <div class="flex space-x-2">
        <CardBox class="w-full shadow-md">
          <form @submit.prevent="submit()">
            <div class="flex space-x-2">
              <FormField label="Tahun" class="w-1/3">
                <select
                  :disabled="capaianIKKStore.isUpdateLoading"
                  required
                  v-model="capaianIKKStore.capaianResponses.tahun"
                  class="border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
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
              <FormField label="Bulan" class="w-1/3">
                <select
                  :disabled="capaianIKKStore.isUpdateLoading"
                  required
                  v-model="capaianIKKStore.capaianResponses.bulan"
                  class="border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
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

            <FormField label="Indikator Kinerja Kegiatan">
              <select
                :disabled="capaianIKKStore.isUpdateLoading"
                required
                v-model="capaianIKKStore.capaianResponses.ikk_id"
                class="border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              >
                <option
                  v-for="option in ikkStore.items"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.name }}
                </option>
              </select>
            </FormField>

            <div class="flex space-x-4">
              <FormField class="w-full" label="Realisasi">
                <FormControl
                  :disabled="capaianIKKStore.isUpdateLoading"
                  v-model="capaianIKKStore.capaianResponses.realisasi"
                  required
                />
              </FormField>

              <FormField class="w-full" label="Presentase Capaian">
                <FormControl
                  :disabled="capaianIKKStore.isUpdateLoading"
                  v-model="capaianIKKStore.capaianResponses.capaian"
                  required
                />
              </FormField>
            </div>

            <FormField label="Analisa">
              <textarea
                :disabled="capaianIKKStore.isUpdateLoading"
                rows="5"
                class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
                style="white-space: pre-wrap"
                v-model="capaianIKKStore.capaianResponses.analisa"
              ></textarea>
            </FormField>

            <FormField label="Kegiatan">
              <textarea
                :disabled="capaianIKKStore.isUpdateLoading"
                rows="5"
                class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
                style="white-space: pre-wrap"
                v-model="capaianIKKStore.capaianResponses.kegiatan"
              ></textarea>
            </FormField>

            <FormField label="Kendala / Hambatan">
              <textarea
                :disabled="capaianIKKStore.isUpdateLoading"
                rows="5"
                class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
                style="white-space: pre-wrap"
                v-model="capaianIKKStore.capaianResponses.kendala"
              ></textarea>
            </FormField>

            <div class="flex flex-col space-y-4">
              <BaseButton
                class="w-fit"
                type="submit"
                :disabled="capaianIKKStore.isUpdateLoading"
                color="info"
                ><span v-if="!capaianIKKStore.isUpdateLoading">Submit</span
                ><span class="flex flex-row items-center px-3" v-else>
                  <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
                  Processing</span
                ></BaseButton
              >
            </div>
          </form>
        </CardBox>
      </div>
    </template>
  </SectionMain>
</template>
@/stores/admin/ikk

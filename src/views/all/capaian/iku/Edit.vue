<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRoute, useRouter } from "vue-router";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";

import { useToast } from "vue-toastification";
import { useIKUStore } from "@/stores/admin/iku";
import { useCapaianIKU } from "@/stores/all/capaianIku";
import NotificationBar from "@/components/NotificationBar.vue";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const authStore = useAuthStore();
const ikuStore = useIKUStore();
const capaianIKUStore = useCapaianIKU();

const quilOptions = {
  readOnly: capaianIKUStore.singleResponses,
  theme: "snow",
};

function toList() {
  router.push({ name: "list-capaian-iku" });
}

async function submit() {
  if (
    capaianIKUStore.singleResponses.ikk_id ||
    capaianIKUStore.singleResponses.realisasi
  ) {
    const result = await capaianIKUStore.update();
    if (result) {
      router.push({ name: "list-capaian-iku" });
    }
  } else {
    toast.error("Data belum lengkap", { timeout: 2000 });
    return false;
  }
}

const id = computed(() => {
  return route.params.id ?? null;
});

onMounted(async () => {
  await capaianIKUStore.showData(id.value);
  ikuStore.$patch((state) => {
    state.filter.unit = authStore.user.user.unit.group_id;
  });
  ikuStore.getData();
});

onUnmounted(() => {
  capaianIKUStore.$reset();
});
</script>

<template>
  <SectionMain>
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
    <template v-else>
      <div class="flex space-x-2">
        <CardBox class="w-full">
          <form @submit.prevent="submit()">
            <FormField label="Indikator Kinerja Utama">
              <select
                :disabled="capaianIKUStore.isUpdateLoading"
                required
                v-model="capaianIKUStore.singleResponses.iku"
                class="border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              >
                <option
                  v-for="option in ikuStore.items"
                  :key="option.id"
                  :value="option"
                >
                  {{ option.name }}
                </option>
              </select>
            </FormField>

            <FormField label="Target">
              <FormControl
                :disabled="true"
                v-model="capaianIKUStore.singleResponses.iku.target"
                required
              />
            </FormField>

            <FormField label="Realisasi">
              <FormControl
                :disabled="capaianIKUStore.isUpdateLoading"
                v-model="capaianIKUStore.singleResponses.realisasi"
                required
              />
            </FormField>

            <FormField label="Analisa">
              <QuillEditor
                class="h-24"
                toolbar="full"
                :contentType="'html'"
                :options="quilOptions"
                v-model:content="capaianIKUStore.singleResponses.analisa"
              />
            </FormField>

            <FormField label="Kegiatan">
              <QuillEditor
                class="h-24"
                toolbar="full"
                :contentType="'html'"
                :options="quilOptions"
                v-model:content="capaianIKUStore.singleResponses.kegiatan"
              />
            </FormField>

            <FormField label="Kendala">
              <QuillEditor
                class="h-24"
                toolbar="full"
                :contentType="'html'"
                :options="quilOptions"
                v-model:content="capaianIKUStore.singleResponses.kendala"
              />
            </FormField>

            <FormField label="Hambatan">
              <QuillEditor
                class="h-24"
                toolbar="full"
                :contentType="'html'"
                :options="quilOptions"
                v-model:content="capaianIKUStore.singleResponses.hambatan"
              />
            </FormField>

            <div class="flex flex-row space-x-2">
              <BaseButton
                class="w-fit"
                type="submit"
                :disabled="capaianIKUStore.isUpdateLoading"
                color="info"
                ><span v-if="!capaianIKUStore.isUpdateLoading">Submit</span
                ><span class="flex flex-row items-center px-3" v-else>
                  <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
                  Processing</span
                ></BaseButton
              >
              <BaseButton
                @click="toList()"
                class="w-fit"
                type="button"
                :disabled="capaianIKUStore.isUpdateLoading"
                color="success"
                >Kembali
              </BaseButton>
            </div>
          </form>
        </CardBox>
      </div>
    </template>
  </SectionMain>
</template>

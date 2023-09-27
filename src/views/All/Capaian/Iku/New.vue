<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";

import { useToast } from "vue-toastification";
import { useMainStore } from "@/stores/main";
import { useAuthStore } from "@/stores/auth";
import { useIKUStore } from "@/stores/admin/iku";
import { useCapaianIKU } from "@/stores/all/capaianIku";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const ikuStore = useIKUStore();
const capaianIKUStore = useCapaianIKU();
const authStore = useAuthStore();

const search = ref("");

const quilOptions = {
  readOnly: capaianIKUStore.isStoreLoading,
  theme: "snow",
};

const formatter = ref({
  date: "DD MMMM YYYY",
});

async function submit() {
  if (
    capaianIKUStore.form.ikk_id ||
    capaianIKUStore.form.realisasi ||
    capaianIKUStore.form.analisa ||
    capaianIKUStore.form.kendala ||
    capaianIKUStore.form.hambatan
  ) {
    const result = await capaianIKUStore.store();
    if (result) {
      router.push({ name: "list-capaian-iku" });
    }
  } else {
    toast.error("Data belum lengkap", { timeout: 2000 });
    return false;
  }
}

onMounted(() => {
  ikuStore.getData();
});

onUnmounted(() => {
  capaianIKUStore.$reset();
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <div class="flex space-x-2">
      <CardBox class="w-full">
        <form @submit.prevent="submit()">
          <FormField label="Indikator Kinerja Utama">
            <select
              :disabled="capaianIKUStore.isStoreLoading"
              required
              v-model="capaianIKUStore.form.iku"
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
              v-model="capaianIKUStore.form.iku.target"
              required
            />
          </FormField>

          <FormField label="Realisasi">
            <FormControl
              :disabled="capaianIKUStore.isStoreLoading"
              v-model="capaianIKUStore.form.realisasi"
              required
            />
          </FormField>

          <FormField label="Analisa">
            <QuillEditor
              class="h-24"
              toolbar="full"
              :contentType="'html'"
              :options="quilOptions"
              v-model:content="capaianIKUStore.form.analisa"
            />
          </FormField>

          <FormField label="Kegiatan">
            <QuillEditor
              class="h-24"
              toolbar="full"
              :contentType="'html'"
              :options="quilOptions"
              v-model:content="capaianIKUStore.form.kegiatan"
            />
          </FormField>

          <FormField label="Kendala">
            <QuillEditor
              class="h-24"
              toolbar="full"
              :contentType="'html'"
              :options="quilOptions"
              v-model:content="capaianIKUStore.form.kendala"
            />
          </FormField>

          <FormField label="Hambatan">
            <QuillEditor
              class="h-24"
              toolbar="full"
              :contentType="'html'"
              :options="quilOptions"
              v-model:content="capaianIKUStore.form.hambatan"
            />
          </FormField>

          <div class="flex flex-col space-y-4">
            <BaseButton
              class="w-fit"
              type="submit"
              :disabled="capaianIKUStore.isStoreLoading"
              color="info"
              ><span v-if="!capaianIKUStore.isStoreLoading">Submit</span
              ><span class="flex flex-row items-center px-3" v-else>
                <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
                Processing</span
              ></BaseButton
            >
          </div>
        </form>
      </CardBox>
    </div>
  </SectionMain>
</template>

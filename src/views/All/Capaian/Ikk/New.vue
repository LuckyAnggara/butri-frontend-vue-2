<script setup>
import { onMounted, onUnmounted } from "vue";
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
import { useIKKStore } from "@/stores/program/ikk";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const ikkStore = useIKKStore();
const capaianIKKStore = useCapaianIkk();
const authStore = useAuthStore();

const quilOptions = {
  readOnly: capaianIKKStore.isStoreLoading,
  theme: "snow",
};

async function submit() {
  if (
    capaianIKKStore.form.ikk_id ||
    capaianIKKStore.form.realisasi ||
    capaianIKKStore.form.analisa ||
    capaianIKKStore.form.kendala ||
    capaianIKKStore.form.hambatan
  ) {
    const result = await capaianIKKStore.store();
    if (result) {
      router.push({ name: "list-capaian-ikk" });
    }
  } else {
    toast.error("Data belum lengkap", { timeout: 2000 });
    return false;
  }
}

onMounted(() => {
  ikkStore.$patch((state) => {
    state.filter.unit = authStore.user.user.unit.group_id;
  });
  ikkStore.getData();
});
onUnmounted(() => {
  capaianIKKStore.$reset();
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <div class="flex space-x-2">
      <CardBox class="w-full">
        <form @submit.prevent="submit()">
          <FormField label="Indikator Kinerja Kegiatan">
            <select
              :disabled="capaianIKKStore.isStoreLoading"
              required
              v-model="capaianIKKStore.form.ikk"
              class="border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option
                v-for="option in ikkStore.items"
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
              v-model="capaianIKKStore.form.ikk.target"
              required
            />
          </FormField>

          <FormField label="Realisasi">
            <FormControl
              :disabled="capaianIKKStore.isStoreLoading"
              v-model="capaianIKKStore.form.realisasi"
              required
            />
          </FormField>

          <FormField label="Analisa">
            <QuillEditor
              class="h-24"
              toolbar="full"
              :contentType="'html'"
              :options="quilOptions"
              v-model:content="capaianIKKStore.form.analisa"
            />
          </FormField>

          <FormField label="Kegiatan">
            <QuillEditor
              class="h-24"
              toolbar="full"
              :contentType="'html'"
              :options="quilOptions"
              v-model:content="capaianIKKStore.form.kegiatan"
            />
          </FormField>

          <FormField label="Kendala">
            <QuillEditor
              class="h-24"
              toolbar="full"
              :contentType="'html'"
              :options="quilOptions"
              v-model:content="capaianIKKStore.form.kendala"
            />
          </FormField>

          <FormField label="Hambatan">
            <QuillEditor
              class="h-24"
              toolbar="full"
              :contentType="'html'"
              :options="quilOptions"
              v-model:content="capaianIKKStore.form.hambatan"
            />
          </FormField>

          <div class="flex flex-col space-y-4">
            <BaseButton
              class="w-fit"
              type="submit"
              :disabled="capaianIKKStore.isStoreLoading"
              color="info"
              ><span v-if="!capaianIKKStore.isStoreLoading">Submit</span
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

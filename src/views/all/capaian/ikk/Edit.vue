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

const route = useRoute();
const router = useRouter();
const toast = useToast();

const ikkStore = useIKKStore();
const capaianIKKStore = useCapaianIkk();
const authStore = useAuthStore();

const quilOptions = {
  readOnly: capaianIKKStore.isUpdateLoading,
  theme: "snow",
};

function toList() {
  router.push({ name: "list-capaian-ikk" });
}

async function submit() {
  if (
    capaianIKKStore.singleResponses.ikk_id ||
    capaianIKKStore.singleResponses.realisasi
  ) {
    await capaianIKKStore.update();
  } else {
    toast.error("Data belum lengkap", { timeout: 2000 });
    return false;
  }
}

const id = computed(() => {
  return route.params.id ?? null;
});

onMounted(async () => {
  await capaianIKKStore.showData(id.value);
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
    <NotificationBar
      v-if="capaianIKKStore.singleResponses == null"
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
            <FormField label="Indikator Kinerja Kegiatan">
              <select
                :disabled="capaianIKKStore.isUpdateLoading"
                required
                v-model="capaianIKKStore.singleResponses.ikk"
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
                v-model="capaianIKKStore.singleResponses.ikk.target"
                required
              />
            </FormField>

            <div class="flex space-x-4">
              <FormField class="w-full" label="Realisasi">
                <FormControl
                  :disabled="capaianIKKStore.isUpdateLoading"
                  v-model="capaianIKKStore.singleResponses.realisasi"
                  required
                />
              </FormField>

              <FormField class="w-full" label="Presentase Capaian">
                <FormControl
                  :disabled="capaianIKKStore.isUpdateLoading"
                  v-model="capaianIKKStore.singleResponses.capaian"
                  required
                />
              </FormField>
            </div>

            <FormField label="Analisa">
              <QuillEditor
                class="h-24"
                toolbar="full"
                :contentType="'html'"
                :options="quilOptions"
                v-model:content="capaianIKKStore.singleResponses.analisa"
              />
            </FormField>

            <FormField label="Kegiatan">
              <QuillEditor
                class="h-24"
                toolbar="full"
                :contentType="'html'"
                :options="quilOptions"
                v-model:content="capaianIKKStore.singleResponses.kegiatan"
              />
            </FormField>

            <FormField label="Kendala / Hambatan">
              <QuillEditor
                class="h-24"
                toolbar="full"
                :contentType="'html'"
                :options="quilOptions"
                v-model:content="capaianIKKStore.singleResponses.kendala"
              />
            </FormField>

            <!-- <FormField label="Hambatan">
              <QuillEditor
                class="h-24"
                toolbar="full"
                :contentType="'html'"
                :options="quilOptions"
                v-model:content="capaianIKKStore.singleResponses.hambatan"
              />
            </FormField> -->

            <div class="flex flex-row space-x-2">
              <BaseButton
                class="w-fit"
                type="submit"
                :disabled="capaianIKKStore.isUpdateLoading"
                color="info"
                ><span v-if="!capaianIKKStore.isUpdateLoading">Update</span
                ><span class="flex flex-row items-center px-3" v-else>
                  <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
                  Processing</span
                ></BaseButton
              >
              <BaseButton
                @click="toList()"
                class="w-fit"
                type="button"
                :disabled="capaianIKKStore.isUpdateLoading"
                color="success"
                ><span v-if="!capaianIKKStore.isUpdateLoading">Kembali</span
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

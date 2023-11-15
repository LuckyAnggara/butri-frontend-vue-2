<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import Select2 from "@/components/Select2.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import BaseButton from "@/components/BaseButton.vue";
import { useKegiatanStore } from "@/stores/all/kegiatan";
import { useToast } from "vue-toastification";

import { useMainStore } from "@/stores/main";
import { useProgramUnggulanStore } from "@/stores/all/programunggulan";
import { useCapaianProgramUnggulan } from "@/stores/all/capaianProgramUnggulan";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const programUnggalanStore = useProgramUnggulanStore();
const capaianProgramUnggulanStore = useCapaianProgramUnggulan();
const kegiatanStore = useKegiatanStore();
const mainStore = useMainStore();

const search = ref("");

const quilOptions = {
  readOnly: programUnggalanStore.isStoreLoading,
  theme: "snow",
};

const formatter = ref({
  date: "DD MMMM YYYY",
});

const dariKegiatan = ref(false);

async function submit() {
  if (
    capaianProgramUnggulanStore.form.program_unggulan_id ||
    capaianProgramUnggulanStore.form.name ||
    capaianProgramUnggulanStore.form.tempat ||
    capaianProgramUnggulanStore.form.jenis_kegiatan ||
    capaianProgramUnggulanStore.form.waktu.startDate ||
    capaianProgramUnggulanStore.form.waktu.endDate
  ) {
    const result = await capaianProgramUnggulanStore.store();
    if (result) {
      router.push({ name: "list-capaian-program-unggulan" });
    }
  } else {
    toast.error("Data belum lengkap", { timeout: 2000 });
    return false;
  }
}

const find = useDebounceFn((x) => {
  kegiatanStore.searchName = search.value;
  kegiatanStore.getData();
}, 500);

function handleChosen(payload) {
  capaianProgramUnggulanStore.addFromKegiatan(payload);
}
watch(dariKegiatan, (newX) => {
  if (!newX) {
    capaianProgramUnggulanStore.resetFromKegiatan();
    search.value = "";
  }
});

onMounted(() => {
  if (programUnggalanStore.items.length <= 0) {
    programUnggalanStore.getData();
  }
});
onUnmounted(() => {
  capaianProgramUnggulanStore.$reset();
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <div class="flex space-x-2">
      <CardBox class="w-full">
        <form @submit.prevent="submit()">
          <FormField label="Program Unggulan">
            <select
              :disabled="capaianProgramUnggulanStore.isStoreLoading"
              required
              v-model="capaianProgramUnggulanStore.form.program_unggulan_id"
              class="border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option
                v-for="option in programUnggalanStore.items"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>
          </FormField>

          <div class="flex items-center mb-4">
            <input
              v-model="dariKegiatan"
              id="checkbox-3"
              type="checkbox"
              value=""
              class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="checkbox-3"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Cari di kegiatan Existing</label
            >
          </div>

          <div class="relative mb-6" v-if="dariKegiatan">
            <label class="block font-bold mb-2"
              >Cari dari Kegiatan Existing</label
            >
            <Select2
              :use-SSR="true"
              @ssr="find"
              :is-loading="capaianProgramUnggulanStore.isStoreLoading"
              :use-loader="true"
              :data="kegiatanStore.items"
              v-model="search"
              placeholder="Cari data kegiatan .."
              @chosen="handleChosen"
            ></Select2>
          </div>

          <FormField label="Nama Kegiatan">
            <FormControl
              :disabled="
                capaianProgramUnggulanStore.isStoreLoading || dariKegiatan
              "
              v-model="capaianProgramUnggulanStore.form.name"
              required
            />
          </FormField>

          <FormField label="Jenis Kegiatan">
            <select
              :disabled="
                capaianProgramUnggulanStore.isStoreLoading || dariKegiatan
              "
              required
              v-model="capaianProgramUnggulanStore.form.jenis_kegiatan"
              class="border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option
                v-for="option in mainStore.jenisKegiatanOptions"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </FormField>

          <FormField label="Tempat Kegiatan">
            <FormControl
              :disabled="
                capaianProgramUnggulanStore.isStoreLoading || dariKegiatan
              "
              v-model="capaianProgramUnggulanStore.form.tempat"
              required
            />
          </FormField>

          <FormField label="Tanggal Kegiatan" v-if="dariKegiatan">
            <input
              :value="capaianProgramUnggulanStore.waktu"
              type="text"
              class="h-12 px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full bg-white dark:bg-slate-800 border"
              :disabled="
                capaianProgramUnggulanStore.isStoreLoading || dariKegiatan
              "
            />
          </FormField>

          <FormField label="Tanggal Kegiatan" v-else>
            <vue-tailwind-datepicker
              :disabled="
                capaianProgramUnggulanStore.isStoreLoading || dariKegiatan
              "
              required
              placeholder="Tanggal dari mulai s/d berakhir"
              v-model="capaianProgramUnggulanStore.form.waktu"
              :formatter="formatter"
              input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            />
          </FormField>

          <FormField label="Nomor dan Tanggal Laporan">
            <textarea
              :disabled="
                capaianProgramUnggulanStore.isStoreLoading || dariKegiatan
              "
              rows="5"
              class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              style="white-space: pre-wrap"
              v-model="capaianProgramUnggulanStore.form.output"
            ></textarea>
          </FormField>

          <FormField label="Catatan">
            <textarea
              :disabled="
                capaianProgramUnggulanStore.isStoreLoading || dariKegiatan
              "
              rows="5"
              class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              style="white-space: pre-wrap"
              v-model="capaianProgramUnggulanStore.form.hambatan"
            ></textarea>
          </FormField>
          <div class="flex flex-col space-y-4">
            <BaseButton
              class="w-fit"
              type="submit"
              :disabled="capaianProgramUnggulanStore.isStoreLoading"
              color="info"
              ><span v-if="!capaianProgramUnggulanStore.isStoreLoading"
                >Submit</span
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

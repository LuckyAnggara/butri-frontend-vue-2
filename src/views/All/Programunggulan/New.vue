<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import { ArrowPathIcon, TrashIcon } from "@heroicons/vue/24/outline";
import Select2 from "@/components/Select2.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import BaseButton from "@/components/BaseButton.vue";
import { useKegiatanStore } from "@/stores/all/kegiatan";
import { useToast } from "vue-toastification";

const route = useRoute();
import { useMainStore } from "@/stores/main";
import { useProgramUnggulanStore } from "@/stores/all/programunggulan";
const router = useRouter();
const toast = useToast();
const programUnggalanStore = useProgramUnggulanStore();
const kegiatanStore = useKegiatanStore();
const mainStore = useMainStore();

const search = ref("");

const formatter = ref({
  date: "DD MMMM YYYY",
});

async function submit() {
  if (
    programUnggalanStore.form.name ||
    programUnggalanStore.form.tempat ||
    programUnggalanStore.form.jenis_kegiatan ||
    programUnggalanStore.form.waktu.startDate ||
    programUnggalanStore.form.waktu.endDate
  ) {
    const result = await programUnggalanStore.store();
    if (result) {
      router.push({ name: "list-kegiatan" });
    }
  } else {
    toast.error("Data belum lengkap", { timeout: 2000 });
    return false;
  }
}

function destroy(index) {
  programUnggalanStore.form.list.splice(index, 1);
}

const find = useDebounceFn((x) => {
  programUnggalanStore.searchName = search.value;
  programUnggalanStore.getData();
}, 500);

const allFill = computed(() => {
  return programUnggalanStore.form.list.every((item) => {
    return item.pangkat !== "";
  });
});

function handleChosen(payload) {
  programUnggalanStore.addFormData(payload);
}

onMounted(() => {
  if (programUnggalanStore.items.length <= 0) {
    programUnggalanStore.getData();
  }
});
onUnmounted(() => {
  programUnggalanStore.$reset();
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
              :disabled="programUnggalanStore.isStoreLoading"
              required
              v-model="programUnggalanStore.form.jenis_kegiatan"
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

          <div class="relative mb-6">
            <label class="block font-bold mb-2"
              >Cari dari Kegiatan Existing</label
            >
            <Select2
              :use-SSR="true"
              @ssr="find"
              :is-loading="programUnggalanStore.isStoreLoading"
              :use-loader="true"
              :data="kegiatanStore.items"
              v-model="search"
              placeholder="Cari data kegiatan .."
              @chosen="handleChosen"
            ></Select2>
          </div>

          <FormField label="Nama Kegiatan">
            <FormControl
              :disabled="programUnggalanStore.isStoreLoading"
              v-model="programUnggalanStore.form.tempat"
              required
            />
          </FormField>

          <FormField label="Tanggal Kegiatan">
            <vue-tailwind-datepicker
              :disabled="programUnggalanStore.isStoreLoading"
              required
              placeholder="Tanggal dari mulai s/d berakhir"
              v-model="programUnggalanStore.form.waktu"
              :formatter="formatter"
              input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            />
          </FormField>

          <FormField label="Output">
            <FormControl
              :type="'textarea'"
              :disabled="programUnggalanStore.isStoreLoading"
              v-model="programUnggalanStore.form.output"
            />
          </FormField>

          <FormField label="Catatan">
            <FormControl
              :type="'textarea'"
              :disabled="programUnggalanStore.isStoreLoading"
              v-model="programUnggalanStore.form.notes"
            />
          </FormField>

          <div class="flex flex-col space-y-4">
            <BaseButton
              class="w-fit"
              type="submit"
              :disabled="programUnggalanStore.isStoreLoading"
              color="info"
              ><span v-if="!programUnggalanStore.isStoreLoading">Submit</span
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

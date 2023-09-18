<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRoute, useRouter } from "vue-router";
import Select2 from "@/components/Select2.vue";
import { useDebounceFn } from "@vueuse/core";
import { ArrowPathIcon, TrashIcon } from "@heroicons/vue/24/outline";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import BaseButton from "@/components/BaseButton.vue";
import { useKegiatanStore } from "@/stores/all/kegiatan";
import { useToast } from "vue-toastification";

const route = useRoute();
import { useMainStore } from "@/stores/main";
const router = useRouter();
const toast = useToast();
const kegiatanStore = useKegiatanStore();
const mainStore = useMainStore();

const search = ref("");

const formatter = ref({
  date: "DD MMMM YYYY",
});

async function submit() {
  if (
    kegiatanStore.form.name ||
    kegiatanStore.form.tempat ||
    kegiatanStore.form.jenis_kegiatan ||
    kegiatanStore.form.waktu.startDate ||
    kegiatanStore.form.waktu.endDate
  ) {
    const result = await kegiatanStore.store();
    if (result) {
      router.push({ name: "list-kegiatan" });
    }
  } else {
    toast.error("Data belum lengkap", { timeout: 2000 });
    return false;
  }
}

function destroy(index) {
  kegiatanStore.form.list.splice(index, 1);
}

const find = useDebounceFn((x) => {
  kegiatanStore.searchName = search.value;
  kegiatanStore.getData();
}, 500);

const allFill = computed(() => {
  return kegiatanStore.form.list.every((item) => {
    return item.pangkat !== "";
  });
});

onMounted(() => {
  if (kegiatanStore.items.length <= 0) {
    kegiatanStore.getData();
  }
});
onUnmounted(() => {
  kegiatanStore.$reset();
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <div class="flex space-x-2">
      <CardBox class="w-full">
        <form @submit.prevent="submit()">
          <FormField label="Nama Kegiatan">
            <FormControl
              :disabled="kegiatanStore.isStoreLoading"
              v-model="kegiatanStore.form.name"
              required
            />
          </FormField>

          <FormField label="Jenis Kegiatan">
            <select
              :disabled="kegiatanStore.isStoreLoading"
              required
              v-model="kegiatanStore.form.jenis_kegiatan"
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
              :disabled="kegiatanStore.isStoreLoading"
              v-model="kegiatanStore.form.tempat"
              required
            />
          </FormField>

          <FormField label="Tanggal Kegiatan">
            <vue-tailwind-datepicker
              :disabled="kegiatanStore.isStoreLoading"
              required
              placeholder="Tanggal dari mulai s/d berakhir"
              v-model="kegiatanStore.form.waktu"
              :formatter="formatter"
              input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            />
          </FormField>

          <FormField label="Output">
            <FormControl
              :type="'textarea'"
              :disabled="kegiatanStore.isStoreLoading"
              v-model="kegiatanStore.form.output"
            />
          </FormField>

          <FormField label="Catatan">
            <FormControl
              :type="'textarea'"
              :disabled="kegiatanStore.isStoreLoading"
              v-model="kegiatanStore.form.notes"
            />
          </FormField>

          <div class="flex flex-col space-y-4">
            <BaseButton
              class="w-fit"
              type="submit"
              :disabled="kegiatanStore.isStoreLoading"
              color="info"
              ><span v-if="!kegiatanStore.isStoreLoading">Submit</span
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

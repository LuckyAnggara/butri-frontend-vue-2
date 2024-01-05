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
import { usePenetapanStore } from "@/stores/risiko/penetapan";
import { useToast } from "vue-toastification";
import { useIKUStore } from "@/stores/admin/iku";
import { useSasaranKementerianStore } from "@/stores/admin/sasaranKementerian";
import { useProgramKegiatanStore } from "@/stores/admin/programKegiatan";

const route = useRoute();
import { useMainStore } from "@/stores/main";
const router = useRouter();
const toast = useToast();
const penetapanStore = usePenetapanStore();
const mainStore = useMainStore();
const ikuStore = useIKUStore();
const sasaranKementerianStore = useSasaranKementerianStore();
const programKegiatanStore = useProgramKegiatanStore();

const search = ref("");

const formatter = ref({
  date: "DD MMMM YYYY",
});

async function submit() {
  if (
    penetapanStore.form.tahun ||
    penetapanStore.form.sasaran_kementerian_id ||
    penetapanStore.form.program_kegiatan_id ||
    penetapanStore.form.permasalahan ||
    penetapanStore.form.iku_id
  ) {
    const result = await penetapanStore.store();
    if (result) {
      router.push({ name: "list-kegiatan" });
    }
  } else {
    toast.error("Data belum lengkap", { timeout: 2000 });
    return false;
  }
}

function destroy(index) {
  penetapanStore.form.list.splice(index, 1);
}

const find = useDebounceFn((x) => {
  penetapanStore.searchName = search.value;
  penetapanStore.getData();
}, 500);

const allFill = computed(() => {
  return penetapanStore.form.list.every((item) => {
    return item.pangkat !== "";
  });
});

onMounted(() => {
  penetapanStore.getData();
  ikuStore.getData();
  sasaranKementerianStore.getData();
  programKegiatanStore.getData();
});
onUnmounted(() => {
  penetapanStore.$reset();
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <div class="flex space-x-2">
      <CardBox class="w-full">
        <form @submit.prevent="submit()">
          <FormField label="Tahun">
            <select
              :disabled="penetapanStore.isStoreLoading"
              v-model="penetapanStore.form.tahun"
              class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
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
          <FormField label="Strategi / Program / Kegiatan">
            <ArrowPathIcon
              v-if="programKegiatanStore.isLoading"
              class="h-5 w-5 animate-spin mr-3"
            />
            <select
              v-else
              :disabled="penetapanStore.isStoreLoading"
              required
              v-model="penetapanStore.form.program_kegiatan_id"
              class="w-full h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option
                v-for="option in programKegiatanStore.items"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>
          </FormField>

          <FormField label="Tujuan / Sasaran">
            <ArrowPathIcon
              v-if="sasaranKementerianStore.isLoading"
              class="h-5 w-5 animate-spin mr-3"
            />
            <select
              v-else
              :disabled="penetapanStore.isStoreLoading"
              required
              v-model="penetapanStore.form.sasaran_kementerian_id"
              class="w-full h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option
                v-for="option in sasaranKementerianStore.items"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>
          </FormField>

          <FormField label="Indikator Kinerja">
            <ArrowPathIcon
              v-if="ikuStore.isLoading"
              class="h-5 w-5 animate-spin mr-3"
            />
            <select
              v-else
              :disabled="penetapanStore.isStoreLoading"
              required
              v-model="penetapanStore.form.iku_id"
              class="w-full h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option
                v-for="option in ikuStore.items"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>
          </FormField>

          <FormField label="Permasalahan">
            <textarea
              rows="5"
              :disabled="penetapanStore.isStoreLoading"
              class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              style="white-space: pre-wrap"
              v-model="penetapanStore.form.permasalahan"
            ></textarea>
          </FormField>

          <div class="flex flex-col space-y-4">
            <BaseButton
              class="w-fit"
              type="submit"
              :disabled="penetapanStore.isStoreLoading"
              color="info"
              ><span v-if="!penetapanStore.isStoreLoading">Submit</span
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

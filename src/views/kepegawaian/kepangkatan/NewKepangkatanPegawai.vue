<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRoute, useRouter } from "vue-router";
import { usePegawaiStore } from "@/stores/pegawai/pegawai";
import Select2 from "@/components/Select2.vue";
import { useDebounceFn } from "@vueuse/core";
import { ArrowPathIcon, TrashIcon } from "@heroicons/vue/24/outline";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import BaseButton from "@/components/BaseButton.vue";
import { useToast } from "vue-toastification";
import { usePangkatStore } from "@/stores/pegawai/pangkat";
import { useKepangkatanStore } from "@/stores/pegawai/kepangkatan";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const pegawaiStore = usePegawaiStore();
const pangkatStore = usePangkatStore();
const kepangkatanStore = useKepangkatanStore();

const search = ref("");

const formatter = ref({
  date: "DD MMMM YYYY",
});

async function submit() {
  if (
    kepangkatanStore.form.list.length > 0 &&
    (kepangkatanStore.form.nomor_sk ||
      kepangkatanStore.form.date ||
      allFill.value)
  ) {
    const result = await kepangkatanStore.store();
    if (result) {
      router.push({ name: "list-kepangkatan-pegawai" });
    }
  } else {
    toast.error("Data belum lengkap", { timeout: 2000 });
    return false;
  }
}

function handleChosen(payload) {
  kepangkatanStore.addFormData(payload);
}
function destroy(index) {
  kepangkatanStore.form.list.splice(index, 1);
}

const find = useDebounceFn((x) => {
  pegawaiStore.searchName = search.value;
  pegawaiStore.getData();
}, 500);

const allFill = computed(() => {
  return kepangkatanStore.form.list.every((item) => {
    return item.pangkat !== "";
  });
});

onMounted(() => {
  pegawaiStore.currentLimit = 5;
  pegawaiStore.getData();
  if (pangkatStore.items.length <= 0) {
    pangkatStore.getData();
  }
});
onUnmounted(() => {
  kepangkatanStore.$reset();
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <div class="flex space-x-2">
      <CardBox class="w-full">
        <FormField label="Nomor Surat Keputusan">
          <FormControl
            :disabled="kepangkatanStore.isStoreLoading"
            v-model="kepangkatanStore.form.nomor_sk"
            required
          />
        </FormField>

        <FormField label="Catatan">
          <FormControl
            :disabled="kepangkatanStore.isStoreLoading"
            v-model="kepangkatanStore.form.notes"
          />
        </FormField>

        <FormField label="TMT Pangkat">
          <vue-tailwind-datepicker
            :disabled="kepangkatanStore.isStoreLoading"
            required
            as-single
            placeholder="Efektif terhitung mulai tanggal"
            v-model="kepangkatanStore.form.date"
            :formatter="formatter"
            input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
          />
        </FormField>

        <div class="relative mb-6">
          <label class="block font-bold mb-2">Cari Pegawai</label>
          <Select2
            :use-SSR="true"
            @ssr="find"
            :is-loading="pegawaiStore.isLoading"
            :use-loader="true"
            :data="pegawaiStore.items"
            v-model="search"
            placeholder="Cari data pegawai .."
            @chosen="handleChosen"
          ></Select2>
        </div>

        <CardBox class="w-full" has-table>
          <h1 class="p-6 block font-bold mb-2">Daftar Pegawai</h1>
          <table>
            <thead>
              <tr>
                <td class="text-center"></td>
                <td class="text-center">Nama</td>
                <td class="text-center">Pangkat Baru</td>
                <td></td>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-if="kepangkatanStore.form.list.length == 0">
                <td colspan="4" class="text-center">
                  <span>Belum ada data</span>
                </td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in kepangkatanStore.form.list"
                :key="item.id"
              >
                <td class="text-center">
                  {{ index + 1 }}
                </td>

                <td>
                  {{ item.name.toUpperCase() ?? "" }}
                </td>

                <td>
                  <select
                    :disabled="pegawaiStore.isStoreLoading"
                    required
                    v-model="item.pangkat_new_id"
                    class="border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
                  >
                    <option
                      v-for="option in pangkatStore.items"
                      :key="option.id"
                      :value="option.id"
                    >
                      {{ option.pangkat.toUpperCase() }} -
                      {{ option.ruang.toUpperCase() }}
                    </option>
                  </select>
                </td>

                <td class="before:hidden lg:w-1 whitespace-nowrap">
                  <TrashIcon
                    @click="destroy(index)"
                    class="w-5 h-5 hover:scale-105 duration-300 ease-in-out cursor-pointer"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </CardBox>
      </CardBox>
    </div>
    <CardBox class="mt-2">
      <div class="flex flex-col space-y-4">
        <BaseButton
          class="w-fit"
          :disabled="kepangkatanStore.isStoreLoading"
          @click="submit"
          color="info"
          ><span v-if="!kepangkatanStore.isStoreLoading">Submit</span
          ><span class="flex flex-row items-center px-3" v-else>
            <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
            Processing</span
          ></BaseButton
        >
      </div>
    </CardBox>
  </SectionMain>
</template>

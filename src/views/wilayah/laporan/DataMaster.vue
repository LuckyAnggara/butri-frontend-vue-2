<script setup>
import SectionMain from "@/components/SectionMain.vue";

import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import { useRoute } from "vue-router";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useDebounceFn, watchDeep } from "@vueuse/core";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon,
} from "@heroicons/vue/24/outline";
import { useMainStore } from "@/stores/main";
import BaseButton from "@/components/BaseButton.vue";
import { useLaporanWilayahStore } from "@/stores/wilayah/laporanwilayah";
import { ref, onMounted, watch } from "vue";
import NewModal from "./Modal.vue";

const search = useDebounceFn(() => {
  laporanStore.getData();
}, 500);
const route = useRoute();
const laporanStore = useLaporanWilayahStore();
const mainStore = useMainStore();

const showNewModal = ref(false);
const updateData = ref(false);

const indexDestroy = ref(0);

function toNew() {
  showNewModal.value = true;
}

function destroy(item) {
  laporanStore.destroy(item.id);
  indexDestroy.value = item.id;
}

async function submit() {
  const result = await laporanStore.store();
  if (result) {
    showNewModal.value = false;
    laporanStore.getData();
  }
}

async function update() {
  const result = await laporanStore.update();
  if (result) {
    showNewModal.value = false;
    laporanStore.getData();
  }
}

watchDeep(laporanStore.filter, (obj) => {
  laporanStore.getData();
});

watch(
  () => laporanStore.currentYear,
  () => {
    laporanStore.getData();
  }
);

// laporanStore.$subscribe((mutation, state) => {
//   if (mutation.events?.key == "currentYear") {
//     laporanStore.getData();
//   }
// });

onMounted(() => {
  laporanStore.getData();
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />

    <CardBox class="mb-4 px-4" has-table>
      <div class="w-full my-4 flex flex-row space-x-4">
        <div class="w-3/12">
          <FormField label="Tahun">
            <select
              :disabled="laporanStore.isLoading"
              v-model="laporanStore.currentYear"
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
        </div>
        <div class="w-5/12">
          <FormField label="Search">
            <FormControl
              @keyup="search"
              v-model="laporanStore.filter.searchQuery"
              type="tel"
              placeholder="Cari berdasarkan indikator"
            />
          </FormField>
        </div>
        <div class="w-2/12"></div>

        <div class="w-2/12 flex justify-end">
          <BaseButton
            @click="toNew()"
            class="mt-8"
            color="info"
            label="Generate"
          />
        </div>
      </div>
    </CardBox>
    <CardBox class="mb-6" has-table>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="laporanStore.isLoading">
            <td colspan="5" class="text-center">
              <div
                class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span
                  class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span
                >
              </div>
            </td>
          </tr>
          <template v-else>
            <tr v-if="laporanStore.items.length == 0">
              <td colspan="5" class="text-center">
                <span>Tidak ada data</span>
              </td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in laporanStore.items"
              :key="item.id"
            >
              <td class="text-center">
                {{ ++index }}
              </td>
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.created_at }}
              </td>
              <td>
                <div class="flex space-x-2">
                  <a
                    class="dark:hover:text-blue-500 cursor-pointer"
                    @click="laporanStore.download(item.name, item.id)"
                  >
                    <span
                      v-if="
                        laporanStore.downloadId == item.id &&
                        laporanStore.isDownloading
                      "
                    >
                      <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
                    </span>
                    <span v-else>
                      <ArrowDownTrayIcon class="w-6 h-6" />
                    </span>
                  </a>
                  <a
                    class="dark:hover:text-blue-500 cursor-pointer"
                    @click="destroy(item)"
                  >
                    <span
                      v-if="
                        laporanStore.destroyId == item.id &&
                        laporanStore.isDestroyLoading
                      "
                    >
                      <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
                    </span>
                    <span v-else>
                      <TrashIcon class="w-6 h-6" />
                    </span>
                  </a>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </CardBox>

    <!-- Modal -->
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <NewModal
        :updateData="updateData"
        :show="showNewModal"
        @close="showNewModal = false"
        @submitStore="submit()"
        @submitUpdate="update()"
      >
      </NewModal>
    </Teleport>
  </SectionMain>
</template>

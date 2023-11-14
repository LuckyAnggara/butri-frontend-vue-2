<script setup>
import SectionMain from "@/components/SectionMain.vue";

import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useDebounceFn } from "@vueuse/core";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/outline";
import { useMainStore } from "@/stores/main";
import BaseButton from "@/components/BaseButton.vue";
import { useCapaianProgramUnggulan } from "@/stores/all/capaianProgramUnggulan";

const search = useDebounceFn(() => {
  capaianProgramUnggulanStore.getData();
}, 500);
const route = useRoute();
const router = useRouter();
const capaianProgramUnggulanStore = useCapaianProgramUnggulan();
const mainStore = useMainStore();

const indexDestroy = ref(0);

const formatter = ref({
  date: "DD MMMM YYYY",
});

const itemMenu = [
  {
    function: destroy,
    label: "Hapus",
    icon: TrashIcon,
  },
];

const previousPage = computed(() => {
  return "&page=" + (capaianProgramUnggulanStore.currentPage - 1);
});

const nextPage = computed(() => {
  return "&page=" + (capaianProgramUnggulanStore.currentPage + 1);
});

function toNew() {
  router.push({ name: "new-capaian-program-unggulan" });
}

function destroy(item) {
  // swal("Hello Vue world!!!");
  capaianProgramUnggulanStore.destroy(item.id);
  indexDestroy.value = item.id;
}

capaianProgramUnggulanStore.$subscribe((mutation, state) => {
  if (mutation.events?.key == "currentLimit") {
    capaianProgramUnggulanStore.getData();
  }
  if (mutation.events?.key == "date") {
    capaianProgramUnggulanStore.getData();
  }
});

onMounted(() => {
  capaianProgramUnggulanStore.getData();
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />

    <CardBox class="mb-4 px-4" has-table>
      <div class="w-full my-4 flex flex-row space-x-4">
        <div class="w-3/12">
          <FormField label="Show">
            <select
              :disabled="capaianProgramUnggulanStore.isStoreLoading"
              v-model="capaianProgramUnggulanStore.currentLimit"
              class="border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option
                v-for="option in mainStore.limitDataOptions"
                :key="option"
                :value="option"
              >
                {{ option == 100000 ? "SEMUA" : option }}
              </option>
            </select>
          </FormField>
        </div>
        <div class="w-5/12">
          <FormField label="Search">
            <FormControl
              @keyup="search"
              v-model="capaianProgramUnggulanStore.filter.searchQuery"
              type="tel"
              placeholder="Cari berdasarkan nama kegiatan"
            />
          </FormField>
        </div>
        <div class="w-4/12">
          <FormField label="Tanggal">
            <vue-tailwind-datepicker
              :disabled="capaianProgramUnggulanStore.isStoreLoading"
              required
              separator=" s/d "
              placeholder="Tanggal Data"
              v-model="capaianProgramUnggulanStore.filter.date"
              :formatter="formatter"
              input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            />
          </FormField>
        </div>
        <div class="w-2/12 flex justify-end">
          <BaseButton
            @click="toNew()"
            class="mt-8"
            type="submit"
            color="info"
            label="Tambah"
          />
        </div>
      </div>
    </CardBox>
    <CardBox class="mb-6" has-table>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Program</th>
            <th>Nama Kegiatan</th>
            <th>Tanggal Pelaksanaan</th>
            <th>Output</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-if="capaianProgramUnggulanStore.isLoading">
            <td colspan="6" class="text-center">
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
            <tr v-if="capaianProgramUnggulanStore.items.length == 0">
              <td colspan="6" class="text-center">
                <span>Tidak ada data</span>
              </td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in capaianProgramUnggulanStore.items"
              :key="item.id"
            >
              <td class="text-center">
                {{ capaianProgramUnggulanStore.from + index }}
              </td>
              <td>
                {{ item.program.name }}
              </td>
              <td>
                {{ item.kegiatan.name }}
              </td>
              <td>
                {{ item.kegiatan.start_at ?? "" }}
                {{ item.kegiatan.end_at ? "s/d" : "" }}
                {{ item.kegiatan.end_at ?? "" }}
              </td>
              <td>
                {{ item.kegiatan.output }}
              </td>
              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <div>
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                        :disabled="
                          capaianProgramUnggulanStore.isDestroyLoading &&
                          indexDestroy == item.id
                        "
                        :class="
                          capaianProgramUnggulanStore.isDestroyLoading &&
                          indexDestroy == item.id
                            ? ''
                            : 'hover:scale-125 ease-in-out duration-300'
                        "
                        class="flex w-full rounded-md font-medium text-black dark:text-white"
                      >
                        <ArrowPathIcon
                          v-if="
                            capaianProgramUnggulanStore.isDestroyLoading &&
                            indexDestroy == item.id
                          "
                          class="animate-spin h-5 w-5 text-black dark:text-white"
                          aria-hidden="true"
                        />
                        <EllipsisVerticalIcon
                          v-else
                          class="h-5 w-5 text-black dark:text-white"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <transition
                      enter-active-class="transition duration-100 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-75 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <MenuItems
                        class="z-50 py-1 absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none"
                      >
                        <div class="px-2 py-1">
                          <MenuItem
                            v-for="menu in itemMenu"
                            v-slot="{ active }"
                          >
                            <button
                              @click="menu.function(item)"
                              :class="[
                                active
                                  ? 'bg-blue-500 text-white'
                                  : 'text-gray-900 dark:text-white',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                              ]"
                            >
                              <component :is="menu.icon" class="w-5 h-5 mr-3" />
                              {{ menu.label }}
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div
        class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 flex justify-end"
      >
        <ul class="inline-flex items-stretch -space-x-px">
          <li>
            <a
              @click="
                capaianProgramUnggulanStore.currentPage == 1
                  ? ''
                  : capaianProgramUnggulanStore.getData(previousPage)
              "
              :disabled="
                capaianProgramUnggulanStore.currentPage == 1 ? true : false
              "
              :class="
                capaianProgramUnggulanStore.currentPage == 1
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
              "
              class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              >Previous</a
            >
          </li>

          <li>
            <a
              @click="
                capaianProgramUnggulanStore.lastPage ==
                capaianProgramUnggulanStore.currentPage
                  ? ''
                  : capaianProgramUnggulanStore.getData(nextPage)
              "
              :class="
                capaianProgramUnggulanStore.lastPage ==
                capaianProgramUnggulanStore.currentPage
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
              "
              class="w-32 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              >Next {{
            }}</a>
          </li>
        </ul>
      </div>
    </CardBox>
  </SectionMain>
</template>
@/stores/all/capaianProgramUnggulan

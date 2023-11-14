<script setup>
import SectionMain from "@/components/SectionMain.vue";

import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import { useRoute, useRouter } from "vue-router";
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import FormField from "@/components/FormField.vue";
import { useDebounceFn } from "@vueuse/core";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  ArrowPathIcon,
  PencilSquareIcon,
} from "@heroicons/vue/24/outline";
import { useMainStore } from "@/stores/main";
import BaseButton from "@/components/BaseButton.vue";
import { usePersuratanStore } from "@/stores/umum/persuratan";
import { useAuthStore } from "@/stores/auth";
import { useUnitGroupStore } from "@/stores/unitGroup";

const route = useRoute();
const persuratanStore = usePersuratanStore();
const mainStore = useMainStore();
const authStore = useAuthStore();
const unitGroupStore = useUnitGroupStore();

const showNewModal = ref(false);
const updateData = ref(false);

const indexDestroy = ref(0);

const itemMenu = [
  {
    function: edit,
    label: "Edit",
    icon: PencilSquareIcon,
  },
  {
    function: destroy,
    label: "Hapus",
    icon: TrashIcon,
  },
];

const previousPage = computed(() => {
  return "&page=" + (persuratanStore.currentPage - 1);
});

const nextPage = computed(() => {
  return "&page=" + (persuratanStore.currentPage + 1);
});

function toNew() {
  showNewModal.value = true;
}

const NewMasterModal = defineAsyncComponent(() => import("./NewModal.vue"));

function destroy(item) {
  persuratanStore.destroy(item.id);
  indexDestroy.value = item.id;
}

function edit(item) {
  showNewModal.value = true;
  updateData.value = true;
  persuratanStore.readyEdit(item);
}

async function submit() {
  const result = await persuratanStore.store();
  if (result) {
    showNewModal.value = false;
    persuratanStore.getData();
  }
}

async function update() {
  persuratanStore.singleResponses.created_by = authStore.user.user.id;
  const result = await persuratanStore.update();

  if (result) {
    showNewModal.value = false;
    persuratanStore.getData();
  }
}

persuratanStore.$subscribe((mutation, state) => {
  if (mutation.events?.key == "currentYear") {
    persuratanStore.getData();
  }
  if (mutation.events?.key == "currentMonth") {
    persuratanStore.getData();
  }
  if (mutation.events?.key == "group") {
    persuratanStore.getData();
  }
});

onMounted(() => {
  if (authStore.user.user.role.id == 2) {
    persuratanStore.$patch((state) => {
      state.filter.group = 0;
      state.filter.currentMonth = 0;
    });
  }
  persuratanStore.getData();
  unitGroupStore.getData();
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
              :disabled="persuratanStore.isLoading"
              v-model="persuratanStore.filter.currentYear"
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
        <div class="w-2/12">
          <FormField v-if="authStore.isAdmin" label="Bulan">
            <select
              :disabled="persuratanStore.isLoading"
              v-model="persuratanStore.filter.currentMonth"
              class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option :value="0">SEMUA</option>
              <option
                v-for="option in mainStore.bulanOptions"
                :key="option.id"
                :value="option.id"
              >
                {{ option.label }}
              </option>
            </select>
          </FormField>
        </div>

        <div class="w-4/12">
          <FormField v-if="authStore.isAdmin" label="Unit">
            <select
              :disabled="persuratanStore.isLoading"
              v-model="persuratanStore.filter.group"
              class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option :value="0">SEMUA</option>
              <option
                v-for="option in unitGroupStore.items"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name.toUpperCase() }}
              </option>
            </select>
          </FormField>
        </div>
        <div class="w-1/12"></div>

        <div class="w-2/12 flex justify-end">
          <BaseButton
            @click="toNew()"
            class="mt-8"
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
            <th>Bulan</th>
            <th>Surat Masuk</th>
            <th>Surat Keluar</th>
            <!-- <th>Unit</th> -->
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-if="persuratanStore.isLoading">
            <td colspan="4" class="text-center">
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
            <tr v-if="persuratanStore.items.length == 0">
              <td colspan="4" class="text-center">
                <span>Tidak ada data</span>
              </td>
            </tr>
            <tr v-else v-for="item in persuratanStore.items" :key="item.id">
              <td class="text-center">
                {{ item.bulan_name }}
              </td>
              <td>
                {{ item.surat_masuk }}
              </td>
              <td>
                {{ item.surat_keluar }}
              </td>
              <!-- <td>
                {{ item.group.name }}
              </td> -->
              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <div>
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                        :disabled="
                          persuratanStore.isDestroyLoading &&
                          indexDestroy == item.id
                        "
                        :class="
                          persuratanStore.isDestroyLoading &&
                          indexDestroy == item.id
                            ? ''
                            : 'hover:scale-125 ease-in-out duration-300'
                        "
                        class="flex w-full rounded-md font-medium text-black dark:text-white"
                      >
                        <ArrowPathIcon
                          v-if="
                            persuratanStore.isDestroyLoading &&
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
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            <th>{{ persuratanStore.totalSuratMasuk }}</th>
            <th>{{ persuratanStore.totalSuratKeluar }}</th>
          </tr>
        </tfoot>
      </table>
      <div
        class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 flex justify-end"
      >
        <ul class="inline-flex items-stretch -space-x-px">
          <li>
            <a
              @click="
                persuratanStore.currentPage == 1
                  ? ''
                  : persuratanStore.getData(previousPage)
              "
              :disabled="persuratanStore.currentPage == 1 ? true : false"
              :class="
                persuratanStore.currentPage == 1
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
                persuratanStore.lastPage == persuratanStore.currentPage
                  ? ''
                  : persuratanStore.getData(nextPage)
              "
              :class="
                persuratanStore.lastPage == persuratanStore.currentPage
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

    <!-- Modal -->
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <NewMasterModal
        :updateData="updateData"
        :show="showNewModal"
        @close="showNewModal = false"
        @submitStore="submit()"
        @submitUpdate="update()"
      >
      </NewMasterModal>
    </Teleport>
  </SectionMain>
</template>

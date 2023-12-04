<script setup>
import SectionMain from "@/components/SectionMain.vue";

import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import { useRoute, useRouter } from "vue-router";
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useDebounceFn, watchDeep } from "@vueuse/core";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  ArrowPathIcon,
  DocumentTextIcon,
} from "@heroicons/vue/24/outline";
import { useMainStore } from "@/stores/main";
import BaseButton from "@/components/BaseButton.vue";
import { useUnitGroupStore } from "@/stores/unitGroup";
import { usePengelolaanInformasiStore } from "@/stores/sip/pengelolaanInformasi";

const NewMasterModal = defineAsyncComponent(() => import("./NewModal.vue"));

const showNewModal = ref(false);
const updateData = ref(false);

const route = useRoute();
const pengelolaanTiStore = usePengelolaanInformasiStore();
const mainStore = useMainStore();
const groupStore = useUnitGroupStore();

const indexDestroy = ref(0);

const isInput = ref(false);

const itemMenu = [
  {
    function: edit,
    label: "Edit",
    icon: DocumentTextIcon,
  },
  {
    function: destroy,
    label: "Hapus",
    icon: TrashIcon,
  },
];

function edit(item) {
  showNewModal.value = true;
  updateData.value = true;
  pengelolaanTiStore.readyEdit(item);
}

function destroy(item) {
  pengelolaanTiStore.destroy(item.id);
  indexDestroy.value = item.id;
}

function open() {
  pengelolaanTiStore.clearForm();
  showNewModal.value = true;
}
function close() {
  showNewModal.value = false;
  pengelolaanTiStore.clearForm();
}

async function submit() {
  const result = await pengelolaanTiStore.store();
  if (result) {
    close();
    pengelolaanTiStore.getData();
    isInput.value = !isInput;
  }
}

async function update() {
  const result = await pengelolaanTiStore.update();
  if (result) {
    showNewModal.value = false;
    pengelolaanTiStore.getData();
  }
}

watchDeep(pengelolaanTiStore.filter, (obj) => {
  pengelolaanTiStore.getData();
});

onMounted(() => {
  pengelolaanTiStore.getData();
  groupStore.getData();
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />

    <CardBox class="mb-4 px-4" has-table>
      <div class="w-full my-4 flex flex-row space-x-4">
        <div class="w-2/12">
          <FormField label="Tahun">
            <select
              :disabled="pengelolaanTiStore.isLoading"
              v-model="pengelolaanTiStore.filter.currentYear"
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
          <FormField label="Bulan">
            <select
              :disabled="pengelolaanTiStore.isLoading"
              v-model="pengelolaanTiStore.filter.currentMonth"
              class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
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
        <div class="w-6/12"></div>
        <div class="w-2/12 flex justify-end">
          <BaseButton @click="open()" class="mt-8" color="info" label="Input" />
        </div>
      </div>
    </CardBox>
    <CardBox class="mb-6" has-table>
      <table>
        <thead>
          <tr>
            <td class="text-center">No</td>
            <td class="text-center">Keterangan</td>
            <td class="text-center"></td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pengelolaanTiStore.isLoading">
            <td colspan="9" class="text-center">
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
            <tr v-if="pengelolaanTiStore.items.length == 0">
              <td colspan="9" class="text-center">
                <span>Tidak ada data</span>
              </td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in pengelolaanTiStore.items"
              :key="item.id"
            >
              <td>
                {{ ++index }}
              </td>

              <td>
                {{ item.keterangan }}
              </td>

              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <div>
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                        :disabled="
                          pengelolaanTiStore.isDestroyLoading &&
                          indexDestroy == item.id
                        "
                        :class="
                          pengelolaanTiStore.isDestroyLoading &&
                          indexDestroy == item.id
                            ? ''
                            : 'hover:scale-125 ease-in-out duration-300'
                        "
                        class="flex w-full rounded-md font-medium text-black dark:text-white"
                      >
                        <ArrowPathIcon
                          v-if="
                            pengelolaanTiStore.isDestroyLoading &&
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
                            :key="menu"
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
      ></div>
    </CardBox>

    <!-- Modal -->
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <NewMasterModal
        :updateData="updateData"
        :show="showNewModal"
        @close="close()"
        @submitStore="submit()"
        @submitUpdate="update()"
      >
      </NewMasterModal>
    </Teleport>
  </SectionMain>
</template>

<script setup>
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRoute } from "vue-router";
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
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
import { useDipaStore } from "@/stores/admin/dipa";
import { useUnitGroupStore } from "@/stores/unitGroup";
import { IDRCurrency } from "@/utilities/formatter";

const NewMasterModal = defineAsyncComponent(() => import("./NewModal.vue"));

const route = useRoute();
const dipaStore = useDipaStore();
const mainStore = useMainStore();
const groupStore = useUnitGroupStore();
const showNewModal = ref(false);
const updateData = ref(false);
const indexDestroy = ref(0);

const search = useDebounceFn(() => {
  dipaStore.getData();
}, 500);
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
  return "&page=" + (dipaStore.currentPage - 1);
});
const nextPage = computed(() => {
  return "&page=" + (dipaStore.currentPage + 1);
});
function toNew() {
  updateData.value = false;
  showNewModal.value = true;
}
function destroy(item) {
  dipaStore.destroy(item.id);
  indexDestroy.value = item.id;
}
function edit(item) {
  showNewModal.value = true;
  updateData.value = true;
  dipaStore.readyEdit(item);
}
async function submit() {
  const result = await dipaStore.store();
  if (result) {
    showNewModal.value = false;
    dipaStore.getData();
  }
}
async function update() {
  const result = await dipaStore.update();
  if (result) {
    showNewModal.value = false;
    dipaStore.getData();
  }
}
dipaStore.$subscribe((mutation, state) => {
  if (mutation.events?.key == "currentYear") {
    dipaStore.getData();
  }
  if (mutation.events?.key == "unit") {
    dipaStore.getData();
  }
});
onMounted(() => {
  groupStore.getData();
  dipaStore.getData();
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
              :disabled="dipaStore.isLoading"
              v-model="dipaStore.filter.currentYear"
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
        <div class="w-4/12">
          <FormField label="Unit">
            <select
              :disabled="dipaStore.isLoading"
              v-model="dipaStore.filter.unit"
              class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option :value="0">Semua</option>
              <option
                v-for="option in groupStore.items"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>
          </FormField>
        </div>
        <div class="w-6/12 flex justify-end">
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
      <h1 class="text-2xl p-4 font-semibold">Per Jenis Kegiatan</h1>
      <table>
        <thead>
          <tr>
            <th>Kode</th>
            <th>Kegiatan</th>
            <th>Unit</th>
            <th>Pagu</th>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="dipaStore.isLoading">
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
            <tr v-if="dipaStore.perKegiatan.length == 0">
              <td colspan="5" class="text-center">
                <span>Tidak ada data</span>
              </td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in dipaStore.perKegiatan"
              :key="item.id"
            >
              <td>
                {{ item.kode }}
              </td>
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.group.name }}
              </td>
              <td>
                {{ IDRCurrency.format(item.pagu) }}
              </td>
              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <div>
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                        :disabled="
                          dipaStore.isDestroyLoading && indexDestroy == item.id
                        "
                        :class="
                          dipaStore.isDestroyLoading && indexDestroy == item.id
                            ? ''
                            : 'hover:scale-125 ease-in-out duration-300'
                        "
                        class="flex w-full rounded-md font-medium text-black dark:text-white"
                      >
                        <ArrowPathIcon
                          v-if="
                            dipaStore.isDestroyLoading &&
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
                            :key="menu.label"
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
            <th scope="row" colspan="3">Total Pagu</th>
            <th>{{ IDRCurrency.format(dipaStore.totalPaguKegiatan) }}</th>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </CardBox>

    <CardBox class="mb-6" has-table>
      <h1 class="text-2xl p-4 font-semibold">Per Jenis Belanja</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Kegiatan</th>
            <!-- <th>Unit</th> -->
            <th>Pagu</th>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="dipaStore.isLoading">
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
            <tr v-if="dipaStore.perBelanja.length == 0">
              <td colspan="4" class="text-center">
                <span>Tidak ada data</span>
              </td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in dipaStore.perBelanja"
              :key="item.id"
            >
              <td>
                {{ ++index }}
              </td>
              <td>
                {{ item.name }}
              </td>
              <!-- <td>
                {{ item.group.name }}
              </td> -->
              <td>
                {{ IDRCurrency.format(item.pagu) }}
              </td>
              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <div>
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                        :disabled="
                          dipaStore.isDestroyLoading && indexDestroy == item.id
                        "
                        :class="
                          dipaStore.isDestroyLoading && indexDestroy == item.id
                            ? ''
                            : 'hover:scale-125 ease-in-out duration-300'
                        "
                        class="flex w-full rounded-md font-medium text-black dark:text-white"
                      >
                        <ArrowPathIcon
                          v-if="
                            dipaStore.isDestroyLoading &&
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
                            :key="menu.label"
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
            <th scope="row" colspan="2">Total Pagu</th>
            <th>{{ IDRCurrency.format(dipaStore.totalPaguBelanja) }}</th>
            <td></td>
          </tr>
        </tfoot>
      </table>
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

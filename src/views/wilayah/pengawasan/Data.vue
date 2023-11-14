<script setup>
import SectionMain from "@/components/SectionMain.vue";

import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import { useRoute, useRouter } from "vue-router";
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useDebounceFn } from "@vueuse/core";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/vue/24/outline";
import { useMainStore } from "@/stores/main";
import BaseButton from "@/components/BaseButton.vue";
import { useUnitGroupStore } from "@/stores/unitGroup";
import { usePengawasanStore } from "@/stores/wilayah/pengawasan";
import { useJenisPengawasanStore } from "@/stores/jenisPengawasan";

const NewMasterModal = defineAsyncComponent(() => import("./NewModal.vue"));
const DetailModal = defineAsyncComponent(() => import("./DetailModal.vue"));

const showNewModal = ref(false);
const showDetailModal = ref(false);
const updateData = ref(false);

const route = useRoute();
const pengawasanStore = usePengawasanStore();
const mainStore = useMainStore();
const groupStore = useUnitGroupStore();
const jenisPengawasanStore = useJenisPengawasanStore();

const indexDestroy = ref(0);

const isInput = ref(false);

const itemMenu = [
  {
    function: output,
    label: "Output",
    icon: ChatBubbleLeftIcon,
  },
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
  pengawasanStore.readyEdit(item);
}

function output(item) {
  showDetailModal.value = true;
  pengawasanStore.readyEdit(item);
}

function destroy(item) {
  pengawasanStore.destroy(item.id);
  indexDestroy.value = item.id;
}

function open() {
  pengawasanStore.clearForm();
  showNewModal.value = true;
}
function close() {
  showNewModal.value = false;
  pengawasanStore.clearForm();
}
function closeDetail() {
  showDetailModal.value = false;
}

async function submit() {
  const result = await pengawasanStore.store();
  if (result) {
    close();
    pengawasanStore.getData();
    isInput.value = !isInput;
  }
}

async function update() {
  const result = await pengawasanStore.update();
  if (result) {
    showNewModal.value = false;
    pengawasanStore.getData();
  }
}

const previousPage = computed(() => {
  return "&page=" + (pengawasanStore.currentPage - 1);
});

const nextPage = computed(() => {
  return "&page=" + (pengawasanStore.currentPage + 1);
});

pengawasanStore.$subscribe((mutation, state) => {
  if (mutation.events?.key == "currentLimit") {
    pengawasanStore.getData();
  }

  if (mutation.events?.key == "currentYear") {
    pengawasanStore.getData();
  }
  if (mutation.events?.key == "currentMonth") {
    pengawasanStore.getData();
  }
});

onMounted(() => {
  pengawasanStore.getData();
  groupStore.getData();
  jenisPengawasanStore.getData();
});
</script>

<template>
  <SectionMain :max-w="false">
    <SectionTitleLineWithButton :title="route.meta.title" main />

    <CardBox class="mb-4 px-4" has-table>
      <div class="w-full my-4 flex flex-row space-x-4">
        <div class="w-1/12">
          <FormField label="Show">
            <select
              :disabled="pengawasanStore.isStoreLoading"
              v-model="pengawasanStore.currentLimit"
              class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
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
        <div class="w-2/12">
          <FormField label="Tahun">
            <select
              :disabled="pengawasanStore.isLoading"
              v-model="pengawasanStore.filter.currentYear"
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
              :disabled="pengawasanStore.isLoading"
              v-model="pengawasanStore.filter.currentMonth"
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
        <div class="w-5/12"></div>
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
            <td class="text-center">Jenis</td>
            <td class="text-center">Nama Kegiatan</td>
            <td class="text-center">Surat Perintah</td>
            <td class="text-center">TMT & Lokasi Kegiatan</td>
            <td class="text-center"></td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pengawasanStore.isLoading">
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
            <tr v-if="pengawasanStore.items.length == 0">
              <td colspan="9" class="text-center">
                <span>Tidak ada data</span>
              </td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in pengawasanStore.items"
              :key="item.id"
            >
              <td class="text-center">
                {{ pengawasanStore.from + index }}
              </td>
              <td>
                {{ item.jenis.name }}
              </td>
              <td style="white-space: pre-line">
                {{ item.name }}
              </td>
              <td>
                {{ item.sp_number }} <br />
                {{ item.sp_date }}
              </td>
              <td>
                {{ item.location }} <br />
                {{ item.start_at }} - {{ item.end_at }}
              </td>
              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <div>
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                        :disabled="
                          pengawasanStore.isDestroyLoading &&
                          indexDestroy == item.id
                        "
                        :class="
                          pengawasanStore.isDestroyLoading &&
                          indexDestroy == item.id
                            ? ''
                            : 'hover:scale-125 ease-in-out duration-300'
                        "
                        class="flex w-full rounded-md font-medium text-black dark:text-white"
                      >
                        <ArrowPathIcon
                          v-if="
                            pengawasanStore.isDestroyLoading &&
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
      >
        <ul class="inline-flex items-stretch -space-x-px">
          <li>
            <a
              @click="
                pengawasanStore.currentPage == 1
                  ? ''
                  : pengawasanStore.getData(previousPage)
              "
              :disabled="pengawasanStore.currentPage == 1 ? true : false"
              :class="
                pengawasanStore.currentPage == 1
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
                pengawasanStore.lastPage == pengawasanStore.currentPage
                  ? ''
                  : pengawasanStore.getData(nextPage)
              "
              :class="
                pengawasanStore.lastPage == pengawasanStore.currentPage
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
        @close="close()"
        @submitStore="submit()"
        @submitUpdate="update()"
      >
      </NewMasterModal>
    </Teleport>

    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <DetailModal :show="showDetailModal" @close="closeDetail()">
      </DetailModal>
    </Teleport>
  </SectionMain>
</template>

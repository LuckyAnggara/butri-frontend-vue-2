<script setup>
import SectionMain from "@/components/SectionMain.vue";

import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useCapaianIkk } from "@/stores/all/capaianIkk";
import { getMonthName } from "@/utilities/formatter";
import NotificationBar from "@/components/NotificationBar.vue";
import { useIKKStore } from "@/stores/admin/ikk";

import {
  ArrowPathIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";

const ikkStore = useIKKStore();
const router = useRouter();
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

function edit(item) {
  router.push({
    name: "edit-capaian-ikk",
    params: { id: item.id },
  });
}

function destroy(item) {
  capaianIKKStore.destroy(item.id);
  indexDestroy.value = item.id;
  capaianIKKStore.getData();
}

const route = useRoute();

const capaianIKKStore = useCapaianIkk();

const id = computed(() => {
  return route.params.id ?? null;
});

onMounted(async () => {
  await capaianIKKStore.showData(id.value);
  ikkStore.getData();
});

onUnmounted(() => {
  capaianIKKStore.$reset();
});
</script>

<template>
  <SectionMain :max-w="false">
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <NotificationBar
      v-if="capaianIKKStore.singleResponses == null"
      color="info"
    >
      <span class="flex flex-row items-center">
        <ArrowPathIcon class="h-6 w-6 animate-spin mr-3" />
        Fetching data ... please wait ...</span
      >
    </NotificationBar>
    <CardBox class="mb-4 px-4">
      <div class="w-full my-4 flex">
        <h4 class="text-2xl">{{ capaianIKKStore.singleResponses?.name }}</h4>
      </div>
    </CardBox>
    <CardBox class="mb-6" has-table>
      <table>
        <thead>
          <tr>
            <th>Bulan</th>
            <th>Realisasi</th>
            <th>% Capaian</th>
            <th>Analisa</th>
            <th>Kegiatan</th>
            <th>Kendala / Hambatan</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-if="capaianIKKStore.singleResponses?.capaian?.length == 0">
            <td colspan="6" class="text-center">
              <span>Tidak ada data</span>
            </td>
          </tr>
          <tr
            v-else
            v-for="item in capaianIKKStore.singleResponses?.capaian"
            :key="item.id"
          >
            <td class="text-center">
              {{ getMonthName(item.bulan) + " " + item.tahun }}
            </td>
            <td>
              <div v-html="item.realisasi"></div>
            </td>
            <td>
              <div v-html="item.capaian"></div>
            </td>
            <td>
              <div v-html="item.analisa"></div>
            </td>
            <td>
              <div v-html="item.kegiatan"></div>
            </td>
            <td>
              <div v-html="item.kendala"></div>
            </td>
            <td class="before:hidden lg:w-1 whitespace-nowrap">
              <div>
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton
                      :disabled="
                        capaianIKKStore.isDestroyLoading &&
                        indexDestroy == item.id
                      "
                      :class="
                        capaianIKKStore.isDestroyLoading &&
                        indexDestroy == item.id
                          ? ''
                          : 'hover:scale-125 ease-in-out duration-300'
                      "
                      class="flex w-full rounded-md font-medium text-black dark:text-white"
                    >
                      <ArrowPathIcon
                        v-if="
                          capaianIKKStore.isDestroyLoading &&
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
        </tbody>
      </table>
    </CardBox>
  </SectionMain>
</template>

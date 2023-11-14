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
  PencilSquareIcon,
} from "@heroicons/vue/24/outline";
import { useMainStore } from "@/stores/main";
import BaseButton from "@/components/BaseButton.vue";
import { useMonitoringEksternalStore } from "@/stores/sip/monitoringExternal";
import { useUnitGroupStore } from "@/stores/unitGroup";
import { useAuthStore } from "@/stores/auth";
import { IDRCurrency, getMonthName } from "@/utilities/formatter";

const NewMasterModalBPK = defineAsyncComponent(() =>
  import("./NewModalBPK.vue")
);

const showNewModalBPK = ref(false);
const showNewModalBPKP = ref(false);
const showNewModalORI = ref(false);
const isUpdateBPK = ref(false);
const isUpdateBPKP = ref(false);
const isUpdateORI = ref(false);
const updateData = ref(false);

const route = useRoute();
const monitoringEksternalStore = useMonitoringEksternalStore();
const mainStore = useMainStore();
const groupStore = useUnitGroupStore();

const indexDestroy = ref(0);

function openBPK() {
  monitoringEksternalStore.readyEditBPK();
  isUpdateBPK.value = true;
}
function closeBPK() {
  monitoringEksternalStore.cancelEditBPK();
  isUpdateBPK.value = !isUpdateBPK.value;
}
function openBPKP() {
  isUpdateBPKP.value = true;
}
function closeBPKP() {
  isUpdateORI.value = !isUpdateORI.value;
}
function openORI() {
  isUpdateORI.value = true;
}
function closeORI() {
  isUpdateORI.value = !isUpdateORI.value;
}

async function submitBPK() {
  const result = await monitoringEksternalStore.storeBPK();
  if (result) {
    monitoringEksternalStore.getDataBPK();
    isUpdateBPK.value = !isUpdateBPK.value;
  }
}

async function submitBPKP() {
  const result = await monitoringEksternalStore.storeBPKP();
  if (result) {
    monitoringEksternalStore.getDataBPKP();
    isUpdateBPKP.value = !isUpdateBPKP.value;
  }
}

async function submitORI() {
  const result = await monitoringEksternalStore.storeORI();
  if (result) {
    monitoringEksternalStore.getDataORI();
    isUpdateORI.value = !isUpdateORI.value;
  }
}

monitoringEksternalStore.$subscribe((mutation, state) => {
  if (mutation.events?.key == "currentYear") {
    isUpdateBPK.value = false;
    callData();
  }
  if (mutation.events?.key == "currentMonth") {
    isUpdateBPK.value = false;
    callData();
  }
});

function callData() {
  monitoringEksternalStore.getDataBPK();
  monitoringEksternalStore.getDataBPKP();
  monitoringEksternalStore.getDataORI();
}

onMounted(() => {
  callData();
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
              :disabled="monitoringEksternalStore.isBPKLoading"
              v-model="monitoringEksternalStore.filter.currentYear"
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
              :disabled="monitoringEksternalStore.isBPKLoading"
              v-model="monitoringEksternalStore.filter.currentMonth"
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
      </div>
    </CardBox>
    <h3 class="my-2 text-2xl">Temuan Badan Pemeriksa Keuangan</h3>
    <CardBox class="mb-6" has-table>
      <div class="ml-2 w-2/12 flex space-x-2">
        <BaseButton
          v-if="!isUpdateBPK"
          @click="openBPK()"
          class="mt-8"
          color="info"
          label="Input"
        />
        <template v-else>
          <BaseButton
            @click="closeBPK()"
            :disabled="monitoringEksternalStore.isStoreBPKLoading"
            class="mt-8 mr-2"
            color="danger"
            label="Batal"
          />
          <BaseButton
            @click="submitBPK()"
            :disabled="monitoringEksternalStore.isStoreBPKLoading"
            class="mt-8"
            color="success"
            ><span v-if="!monitoringEksternalStore.isStoreBPKLoading"
              >Submit</span
            ><span class="flex flex-row items-center" v-else>
              <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
              Processing</span
            ></BaseButton
          >
        </template>
      </div>
      <table>
        <thead>
          <tr>
            <td class="text-center">Keterangan</td>
            <td class="text-center">Jumlah</td>
            <td class="text-center">Nominal</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="monitoringEksternalStore.isBPKLoading">
            <td colspan="3" class="text-center">
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
            <tr v-if="monitoringEksternalStore.itemsBPK.length == 0">
              <td colspan="3" class="text-center">
                <span>Tidak ada data</span>
              </td>
            </tr>
            <tr
              v-else
              v-for="item in monitoringEksternalStore.itemsBPK"
              :key="item.id"
            >
              <td>
                {{ item.keterangan }}
              </td>
              <td>
                <span v-if="!isUpdateBPK">
                  {{ item.jumlah }}
                </span>
                <FormControl v-else v-model="item.jumlah" type="number" />
              </td>
              <td>
                <span v-if="!isUpdateBPK">
                  {{ IDRCurrency.format(item.nominal) }}
                </span>
                <FormControl v-else v-model="item.nominal" type="number" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div
        class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 flex justify-end"
      ></div>
    </CardBox>

    <h3 class="my-2 text-2xl">Temuan Badan Pemeriksa Keuangan</h3>
    <CardBox class="mb-6" has-table>
      <div class="ml-2 w-2/12 flex space-x-2">
        <BaseButton
          v-if="!isUpdateBPKP"
          @click="openBPKP()"
          class="mt-8"
          color="info"
          label="Input"
        />
        <template v-else>
          <BaseButton
            @click="closeBPKP()"
            class="mt-8 mr-2"
            color="danger"
            label="Batal"
          />
          <BaseButton @click="submitBPKP()" class="mt-8" color="success"
            ><span v-if="!monitoringEksternalStore.isStoreBPKPLoading"
              >Submit</span
            ><span class="flex flex-row items-center" v-else>
              <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
              Processing</span
            ></BaseButton
          >
        </template>
      </div>
      <table>
        <thead>
          <tr>
            <td class="text-center">Keterangan</td>
            <td class="text-center">Jumlah</td>
            <td class="text-center">Nominal</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="monitoringEksternalStore.isBPKPLoading">
            <td colspan="3" class="text-center">
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
            <tr v-if="monitoringEksternalStore.itemsBPKP.length == 0">
              <td colspan="3" class="text-center">
                <span>Tidak ada data</span>
              </td>
            </tr>
            <tr
              v-else
              v-for="item in monitoringEksternalStore.itemsBPKP"
              :key="item.id"
            >
              <td>
                {{ item.keterangan }}
              </td>
              <td>
                <span v-if="!isUpdateBPKP">
                  {{ item.jumlah }}
                </span>
                <FormControl v-else v-model="item.jumlah" type="number" />
              </td>
              <td>
                <span v-if="!isUpdateBPKP">
                  {{ IDRCurrency.format(item.nominal) }}
                </span>
                <FormControl v-else v-model="item.nominal" type="number" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div
        class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 flex justify-end"
      ></div>
    </CardBox>

    <h3 class="my-2 text-2xl">Temuan Ombudsman RI</h3>
    <CardBox class="mb-6" has-table>
      <div class="ml-2 w-2/12 flex space-x-2">
        <BaseButton
          v-if="!isUpdateORI"
          @click="openORI()"
          class="mt-8"
          color="info"
          label="Input"
        />
        <template v-else>
          <BaseButton
            @click="closeORI()"
            class="mt-8 mr-2"
            color="danger"
            label="Batal"
          />
          <BaseButton @click="submitORI()" class="mt-8" color="success"
            ><span v-if="!monitoringEksternalStore.isStoreORILoading"
              >Submit</span
            ><span class="flex flex-row items-center" v-else>
              <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
              Processing</span
            ></BaseButton
          >
        </template>
      </div>
      <table>
        <thead>
          <tr>
            <td class="text-center">Keterangan</td>
            <td class="text-center">Jumlah</td>
            <td class="text-center">Nominal</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="monitoringEksternalStore.isStoreORILoading">
            <td colspan="3" class="text-center">
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
            <tr v-if="monitoringEksternalStore.itemsORI.length == 0">
              <td colspan="3" class="text-center">
                <span>Tidak ada data</span>
              </td>
            </tr>
            <tr
              v-else
              v-for="item in monitoringEksternalStore.itemsORI"
              :key="item.id"
            >
              <td>
                {{ item.keterangan }}
              </td>
              <td>
                <span v-if="!isUpdateORI">
                  {{ item.jumlah }}
                </span>
                <FormControl v-else v-model="item.jumlah" type="number" />
              </td>
              <td>
                <span v-if="!isUpdateORI">
                  {{ IDRCurrency.format(item.nominal) }}
                </span>
                <FormControl v-else v-model="item.nominal" type="number" />
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
      <NewMasterModalBPK
        :updateData="updateData"
        :show="showNewModalBPK"
        @close="close()"
        @submitStore="submit()"
        @submitUpdate="update()"
      >
      </NewMasterModalBPK>
    </Teleport>
  </SectionMain>
</template>

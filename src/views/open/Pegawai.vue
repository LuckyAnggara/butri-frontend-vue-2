<script setup>
import { usePegawaiStore } from "@/stores/pegawai/pegawai";
import { useDebounceFn } from "@vueuse/core";
import { onMounted } from "vue";

const pegawaiStore = usePegawaiStore();
const search = useDebounceFn(() => {
  pegawaiStore.getData();
}, 500);
onMounted(() => {
  pegawaiStore.currentLimit = 10000;
  pegawaiStore.getData();
});
</script>

<template>
  <!-- component -->

  <div
    class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8"
  >
    <div
      class="align-middle space-y-4 rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12"
    >
      <span class="text-2xl font-bold"
        >Daftar Informasi Pegawai Inspektorat Jenderal</span
      >

      <div class="flex justify-between">
        <div
          class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent"
        >
          <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
            <div class="flex">
              <span
                class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 text-grey-dark text-sm"
              >
                <svg
                  width="18"
                  height="18"
                  class="w-4 lg:w-auto"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                    stroke="#455A64"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.9993 16.9993L13.1328 13.1328"
                    stroke="#455A64"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
            <input
              @keyup="search"
              v-model="pegawaiStore.searchName"
              type="text"
              class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <p class="text-sm leading-5 text-blue-700 mt-5">
        Total
        <span class="font-medium">{{ pegawaiStore.items.length }}</span>
        Pegawai
      </p>
    </div>

    <div
      class="align-middle inline-block min-w-full bg-white shadow-dashboard px-8 pt-3"
    >
      <table class="min-w-full">
        <thead>
          <tr>
            <th
              class="px-6 py-3 -2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
            >
              NIP
            </th>
            <th
              class="px-6 py-3 -2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
            >
              Nama
            </th>
            <th
              class="px-6 py-3 -2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
            >
              Pangkat
            </th>
            <th
              class="px-6 py-3 -2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
            >
              Jabatan
            </th>
            <th
              class="px-6 py-3 -2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
            >
              Unit
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="pegawai in pegawaiStore.items" :key="pegawai.id">
            <td
              class="px-6 py-4 text-blue-900 border-gray-500 text-sm leading-5"
            >
              {{ pegawai.nip }}
            </td>
            <td
              class="px-6 py-4 text-blue-900 border-gray-500 text-sm leading-5"
            >
              {{ pegawai.name }}
            </td>
            <td
              class="px-6 py-4 text-blue-900 border-gray-500 text-sm leading-5"
            >
              {{ pegawai.pangkat?.pangkat.toUpperCase() ?? "-" }}
            </td>
            <td
              class="px-6 py-4 text-blue-900 border-gray-500 text-sm leading-5"
            >
              {{ pegawai.jabatan?.name ?? "-" }}
            </td>
            <td
              class="px-6 py-4 text-blue-900 border-gray-500 text-sm leading-5"
            >
              {{ pegawai.unit?.name.toUpperCase() ?? "-" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

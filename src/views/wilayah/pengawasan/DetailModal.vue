<template>
  <div
    v-if="show"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
  >
    <!-- Modal content -->
    <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
      <!-- Modal content -->
      <div
        class="relative p-4 bg-white dark:bg-slate-900 rounded-lg shadow sm:p-5"
      >
        <div
          class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Nomor dan Tanggal Laporan
          </h3>
          <button
            @click="closeModal"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div>
          <!-- {{ pengawasanStore.singleResponses.output }} -->
          <FormField label="">
            <FormControl
              type="textarea"
              required
              v-model="pengawasanStore.singleResponses.output"
              :disabled="true"
            />
          </FormField>
        </div>
        <!-- <hr class="my-4" />
        <h1 class="text-bold text-xl my-4">Update Data</h1>
        <div>
          <div class="relative mb-6">
            <label class="block font-bold">Nomor dan Tanggal LHP</label>
            <input
              required
              type="text"
              class="h-12 border mt-4 px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              v-model="pengawasanStore.singleResponses.lhp"
              placeholder="Isikan dengan nomor lhp dan tanggal LHP"
            />
          </div>
        </div>

        <div class="flex justify-start space-x-3 items-center">
          <BaseButton
            :disabled="pengawasanStore.isUpdateLoading"
            type="button"
            @click="updateLHP()"
            color="info"
            ><span v-if="!pengawasanStore.isUpdateLoading">Update</span
            ><span class="flex flex-row items-center" v-else>
              <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
              Processing</span
            ></BaseButton
          >
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "@/components/BaseButton.vue";
import FormControl from "@/components/FormControl.vue";
import FormField from "@/components/FormField.vue";
import { usePengawasanStore } from "@/stores/wilayah/pengawasan";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  show: Boolean,
  updateData: Boolean,
});

const emit = defineEmits(["close", "submitUpdate"]);

const pengawasanStore = usePengawasanStore();

const quilOptions = {
  readOnly: pengawasanStore.isStoreLoading,
  theme: "snow",
};

function updateLHP() {
  emit("submitUpdate");
}

function closeModal() {
  emit("close");
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

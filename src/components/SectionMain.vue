<script setup>
import { containerMaxW, containerWithoutMaxW } from "@/config.js";
const props = defineProps({
  maxW: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <section
    class="p-6"
    :class="maxW == true ? containerMaxW : containerWithoutMaxW"
  >
    <slot />
  </section>
</template>

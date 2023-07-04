<template>
  <div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationTriangleIcon
          class="h-6 w-6 text-yellow-400"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <p class="text-yellow-700">
          {{ alert.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon } from "@heroicons/vue/20/solid";
import { defineProps } from "vue";

const props = defineProps({
  alert: {
    type: Object,
    required: true,
  },
});
</script>

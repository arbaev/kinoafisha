<template>
  <TransitionEffect>
    <div v-if="errors.length > 0">
      <div
        v-for="(err, idx) in errors"
        :key="idx"
        class="border-l-4 border-yellow-400 bg-yellow-50 p-4"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <ExclamationTriangleIcon
              class="h-6 w-6 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div class="ml-3">
            <p class="text-yellow-700 font-semibold">
              {{ errorMessage(err) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </TransitionEffect>
</template>

<script setup>
import { ExclamationTriangleIcon } from "@heroicons/vue/20/solid";
import { defineProps } from "vue";
import TransitionEffect from "@/components/TransitionEffect.vue";

const props = defineProps({
  errors: {
    type: Array,
    required: true,
  },
});

const errorMessage = (err) => {
  if (err?.name === "AxiosError") {
    return err.response.data.status_message;
  } else {
    return err.message;
  }
};
</script>

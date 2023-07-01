<script setup>
import { CalendarDaysIcon, ClockIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";

const props = defineProps({
  movie: Object,
});

const releaseYear = computed(() => {
  let date = new Date(props.movie.release_date);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
  });
});

const duration = computed(() => {
  let hours = Math.trunc(props.movie.runtime / 60);
  let minutes = props.movie.runtime % 60;
  minutes = minutes.toString().length < 2 ? `0${minutes}` : minutes;

  return `${hours}:${minutes}`;
});
</script>

<template>
  <div class="flex">
    <span
      class="inline-flex items-center gap-x-1.5 mr-5 pr-2 py-1 text-sm font-medium text-gray-900"
    >
      <CalendarDaysIcon class="h-5 w-5" aria-hidden="true" />
      {{ releaseYear }}
    </span>

    <span
      class="inline-flex items-center gap-x-1.5 mr-5 pr-2 py-1 text-sm font-medium text-gray-900"
    >
      <ClockIcon class="h-5 w-5" aria-hidden="true" />
      {{ duration }}
    </span>

    <div v-for="gnr in movie.genres" :key="gnr.id">
      <span
        class="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 mr-3 px-2 py-1 text-xs font-medium text-gray-600"
      >
        &#x2022; {{ gnr.name }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

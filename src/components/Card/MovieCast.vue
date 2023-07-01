<script setup>
import { watch } from "vue";
import getCredits from "@/composables/getCredits";

const props = defineProps({
  movie_id: Number,
});

const { cast, crew, error, fetchMovieCredits } = getCredits();

fetchMovieCredits(props.movie_id);

// watch(cast, () => {
//   // This function will be called whenever `counter` changes
//   console.log("cast", cast.value);
// });
</script>

<template>
  <div class="grid grid-cols-1 gap-2 grid-cols-3 my-4">
    <div
      v-for="person in cast.slice(0, 3)"
      :key="person.id"
      class="relative flex items-center space-x-3"
    >
      <div class="flex-shrink-0">
        <img
          class="h-12 w-12 rounded"
          :src="
            'https://image.tmdb.org/t/p/w66_and_h66_face' + person.profile_path
          "
          :alt="person.name"
        />
      </div>
      <div class="min-w-0 flex-1">
        <a href="#" class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-bold text-gray-900">{{ person.name }}</p>
          <p class="truncate text-sm text-gray-500">{{ person.character }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

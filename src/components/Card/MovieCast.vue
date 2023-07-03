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
        <p class="text-sm font-bold text-gray-900">{{ person.name }}</p>
        <p class="truncate text-sm text-gray-500">{{ person.character }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import getCredits from "@/composables/getCredits";

const props = defineProps({
  movie_id: {
    type: Number,
    required: true,
  },
});

const { cast, crew, error, fetchMovieCredits } = getCredits();

fetchMovieCredits(props.movie_id);
</script>

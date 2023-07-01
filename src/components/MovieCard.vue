<script setup>
import { XMarkIcon as XMarkIconMini } from "@heroicons/vue/20/solid";
import MovieInfo from "@/components/Card/MovieInfo.vue";
import MovieCast from "./Card/MovieCast.vue";

const props = defineProps({
  movie: Object,
});

const emit = defineEmits(["sendRemoveMovie"]);

const removeMovie = () => {
  emit("sendRemoveMovie", props.movie);
};
</script>

<template>
  <div class="flex relative mx-10 my-6 border-b">
    <div class="mb-4 mt-2 flex-shrink-0 p-2">
      <img
        :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
        :alt="movie.original_title"
        class="w-40 rounded"
      />
    </div>
    <div class="p-2">
      <h4 class="text-3xl font-bold text-gray-700">
        {{ movie.original_title }}
      </h4>
      <h5 class="text-xl font-bold text-gray-500 mb-2">{{ movie.title }}</h5>

      <MovieInfo :movie="movie" />

      <p class="mt-1 leading-snug">{{ movie.overview }}</p>

      <MovieCast :movie_id="movie.id" />

      <!-- TODO: Это надо не показывать на печате, заменить на центральное состояние -->
      <div class="absolute top-0 right-0">
        <button
          type="button"
          @click="removeMovie"
          class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">Remove</span>
          <XMarkIconMini class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

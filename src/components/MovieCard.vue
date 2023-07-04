<template>
  <div class="flex relative mx-10 my-6 border-b">
    <div class="mb-4 mt-2 flex-shrink-0 p-2">
      <img :src="posterPath" :alt="movie.original_title" class="w-40 rounded" />
    </div>
    <div class="p-2">
      <h4 class="text-3xl font-bold text-gray-700">
        {{ movie.original_title }}
      </h4>
      <h5 class="text-xl font-bold text-gray-500 mb-2">{{ movie.title }}</h5>

      <MovieInfo :movie="movie" />

      <p class="mt-1 leading-snug">{{ movie.overview }}</p>

      <MovieCast :movie_id="movie.id" />

      <div v-show="!kinoAfishaStore.isPrinting" class="absolute top-0 right-0">
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

<script setup>
import { computed } from "vue";
import { useKinoAfishaStore } from "@/stores/kinoAfishaStore";
import { XMarkIcon as XMarkIconMini } from "@heroicons/vue/20/solid";
import MovieInfo from "@/components/Card/MovieInfo.vue";
import MovieCast from "@/components/Card/MovieCast.vue";

const kinoAfishaStore = useKinoAfishaStore();

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const removeMovie = () => {
  kinoAfishaStore.removeMovie(props.movie);
};

const posterPath = computed(() => {
  if (props.movie.poster_path) {
    return `https://image.tmdb.org/t/p/w300${props.movie.poster_path}`;
  } else {
    return `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`;
  }
});
</script>

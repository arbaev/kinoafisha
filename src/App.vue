<script>
import { ref, watch } from "vue";
import HeaderMain from "@/components/HeaderMain.vue";
import MovieForm from "@/components/MovieForm.vue";
import MovieList from "@/components/MovieList.vue";
import getMovie from "@/composables/getMovie";
import hideElementsForPrint from "@/composables/hideElementsForPrint";

export default {
  components: {
    HeaderMain,
    MovieForm,
    MovieList,
  },

  setup() {
    const movies = ref([]);
    const recieveMovieNameText = (text) => {
      fetchMovie(text);
    };
    const { movie, error, fetchMovie } = getMovie();

    watch(movie, (movieData) => {
      movies.value.push(movieData);
    });

    const recieveRemoveMovie = (movie) => {
      movies.value = movies.value.filter((m) => m.id !== movie.id);
    };

    const { printing } = hideElementsForPrint();

    return {
      movies,
      error,
      printing,
      recieveMovieNameText,
      recieveRemoveMovie,
    };
  },
};
</script>

<template>
  <div class="container mx-auto">
    <div v-show="!printing">
      <HeaderMain />
      <MovieForm @sendMovieName="recieveMovieNameText" class="my-6" />
    </div>
    <MovieList :movies="movies" @sendRemoveMovie="recieveRemoveMovie" />
  </div>
</template>

<style scoped></style>

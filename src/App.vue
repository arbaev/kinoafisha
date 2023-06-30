<script>
import { ref, watch } from "vue";
import HeaderMain from "./components/HeaderMain.vue";
import MovieForm from "./components/MovieForm.vue";
import MovieList from "./components/MovieList.vue";
import getMovie from "./composables/getMovie";

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

    return { movies, error, recieveMovieNameText };
  },
};
</script>

<template>
  <div class="container mx-auto">
    <HeaderMain />
    <MovieForm @sendMovieName="recieveMovieNameText" class="my-6" />
    <MovieList :movies="movies" />
  </div>
</template>

<style scoped></style>

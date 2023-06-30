<script>
import { ref } from "vue";
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
    const movieNameText = ref("");
    const recieveMovieNameText = (text) => {
      movieNameText.value = text;
      fetchMovie(movieNameText.value);
    };
    const { movie, error, fetchMovie } = getMovie(movieNameText.value);

    return { movie, error, movieNameText, recieveMovieNameText };
  },
};
</script>

<template>
  <div class="container mx-auto">
    <!-- <HeaderMain /> -->
    <MovieForm @sendMovieName="recieveMovieNameText" class="my-6" />
    {{ movieNameText }}
    {{ movie }}
    <!-- <MovieList /> -->
  </div>
</template>

<style scoped></style>

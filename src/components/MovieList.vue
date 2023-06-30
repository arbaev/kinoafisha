<script>
import MovieCard from "./MovieCard.vue";

export default {
  props: ["movies"],
  components: { MovieCard },
  setup(props) {},
};
</script>

<template>
  <div>
    movie list
    <div v-for="movie in movies" :key="movie.id">
      <MovieCard :movie="movie" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

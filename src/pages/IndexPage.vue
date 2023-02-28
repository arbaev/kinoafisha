<template>
  <q-page class="flex">
    <div v-if="ids.length === 0">
      <movie-form />
    </div>
    <div v-else>
      <movie-card
        :movie_id="movie_id"
        v-for="movie_id in ids"
        :key="movie_id"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { emitter } from "boot/emitter";
import MovieCard from "components/MovieCard.vue";
import MovieForm from "components/MovieForm.vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      loading: false,
      ids: [],
    };
  },
  components: {
    MovieCard,
    MovieForm,
  },
  created() {},
  mounted() {
    emitter.on("movieSubmitted", this.movieSubmitted);
  },

  methods: {
    movieSubmitted(movie_array) {
      this.ids = movie_array;
    },
  },
});
</script>
<style lang="scss"></style>
